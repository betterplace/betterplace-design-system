import Generator from 'yeoman-generator'
import { ComponentInfo, FileInfo, getComponentSpecUrl, PropData, Props, PropType } from '../figma/lib/fetch_components'
import { camelize, kebabCase, objToArr, snakeify } from '../figma/lib/helpers'
import Fuse from 'fuse.js'
import { prettierTransform } from './transforms'
// until we simplify the dir structure we have to do it like this
// import SDConfig from '../config/style-dictionary/config'
const SDConfig = {
  platforms: {
    css: {
      prefix: 'betterplace',
    },
  },
}

interface GeneratorOpts {
  name: string
  root: string
  figma?: boolean
  story?: boolean
  test?: boolean
}

type Opts = GeneratorOpts &
  ComponentInfo & {
    camelizedName: string
    snakifiedName: string
  }

type VariantPropValue = { name: string; value: string; required: boolean }
type Variant = { name: string; values: Array<VariantPropValue> }
function getStringifiedValue(type?: PropType | string): string {
  switch (type) {
    case 'boolean':
      return `true`
    case 'number':
      return `1`
    case 'string':
      return '`Lorem ipsum sic dolor`'
    case 'object':
      return `{}`
    case 'array':
      return `[]`
    case 'null':
      return `null`
    case 'any':
      return 'undefined'
    case 'JSX.Element':
      return `<span>Lorem ipsum sic dolor in markupo</span>`
    default:
      return `'${type}'`
  }
}

class StorybookGenerator extends Generator<GeneratorOpts> {
  static createVariants(props?: Props) {
    if (!props) return []
    const resHash: Record<string, Variant> = {}
    const arr = objToArr(props).sort(({ required: a }, { required: b }) => +b - +a)
    const count = arr.length
    if (!count) return []
    arr.forEach((outer) => {
      const vsOrig = [...(outer.values ?? []), ...(outer.type ?? [])]
      if (!vsOrig.length) vsOrig.push('any')
      const values = vsOrig.map(getStringifiedValue)
      values.forEach((v, index) => {
        let key = ''
        const variant: Variant = {
          name: camelize(`${outer.name} ${vsOrig[index].replace(/'/gi, '')}`, true),
          values: [],
        }
        arr.forEach((inner) => {
          const sameProp = inner.name === outer.name
          if (!inner.required && !sameProp) return
          const value = sameProp ? v : getStringifiedValue(inner.values?.[0] ?? inner.type?.[0])
          variant.values.push({ name: inner.name, value, required: inner.required })
          key += `${inner.name}:${value}::`
        })
        if (resHash[key]) return
        resHash[key] = variant
      })
    })
    return objToArr(resHash)
  }
  options: Opts
  fileInfo?: FileInfo
  componentPath: string
  componentsRoot: string

  constructor(args: string | string[], opts: Opts) {
    super(args, opts)
    this.option('root', {
      type: String,
      description: "Specifies components' root",
    })
    this.argument('name', {
      required: true,
      type: String,
      description: 'The name of the component',
    })
    this.option('figma', { type: Boolean, description: 'Link with Figma component' })
    this.options = { ...opts, props: opts.props ?? {} }
    this.options.camelizedName = camelize(this.options.name)
    this.options.snakifiedName = snakeify(this.options.name)
    console.log(this.options.snakifiedName, this.options.camelizedName)
    if (!this.options.root) {
      this.log.error('Component root was not provided!')
      process.exit(1)
    }
    this.destinationRoot(this.options.root)
    this.componentsRoot = this.destinationRoot() + '/components'
    this.componentPath = `${this.componentsRoot}/${this.options.snakifiedName}`
    const trafo = prettierTransform()
    this.queueTransformStream(trafo)
  }

  async getFileInfo() {
    return (
      import('../config/components.json')
        // .then((r) => r.json())
        .then((d: { meta: { file: FileInfo } }) => {
          this.fileInfo = d.meta.file
        })
    )
  }

  async prompting() {
    if (!this.options.figma || !this.options.story) return Promise.resolve()
    const res = (await import('../config/components.json').then((d) => d.data)) as Record<string, ComponentInfo>
    const list = objToArr(res)
    let figma: ComponentInfo | undefined
    const figmaPath = `${this.componentPath}/figma.lock.ts`
    if (this.fs.exists(figmaPath)) {
      const id: string = await import(figmaPath).then((module) => module.default.id)
      figma = list.find((f) => f.id === id)
    }
    if (!figma) {
      const engine = new Fuse(list, { includeScore: true, keys: ['path'] })
      const results = engine.search(this.options.name)
      if (!results.length) {
        this.log('Could not find matching figma components')
        return Promise.resolve()
      }
      const answers = await this.prompt([
        {
          type: 'list',
          message: 'Choose figma component',
          name: 'figma',
          choices: results.map(({ item }) => ({ name: item.path, value: item })),
        },
      ] as const)
      figma = answers.figma
    }
    this.options = { ...this.options, ...figma, name: this.options.name }
  }

  writing() {
    const cssFileName = `${this.options.snakifiedName}.module.css`
    const compFileName = `${this.options.snakifiedName}.tsx`
    const hash: Record<string, boolean> = {}
    const storyTitle = ['Components', this.options.canvasName, this.options.frameName, this.options.name]
      .filter(Boolean)
      .map((name) => name.replace(/[^a-z\s]/gim, '').trim())
      .filter((name) => {
        const res = !hash[name]
        hash[name] = true
        return res
      })
      .join('/')
    const mainClassName = `${this.options.camelizedName}Main`
    const compName = camelize(this.options.name, true)
    const propsName = `${compName}Props`
    const variants = StorybookGenerator.createVariants(this.options.props)

    this.fs.copyTpl(this.templatePath('types.ts.ejs'), this.destinationPath(`${this.componentPath}/types.ts`), {
      propsName,
      props: objToArr(this.options.props),
    })
    this.fs.copyTpl(
      this.templatePath('component.tsx.ejs'),
      this.destinationPath(`${this.componentPath}/${compFileName}`),
      {
        propsName,
        cssFileName,
        componentName: compName,
        mainClassName,
      }
    )
    this.fs.copyTpl(
      this.templatePath('component.test.tsx.ejs'),
      this.destinationPath(`${this.componentPath}/${this.options.snakifiedName}.test.tsx`),
      {
        compName,
        compFileName: this.options.snakifiedName,
        compFullName: this.options.name,
        variants,
        mainClassName,
      }
    )
    if (this.options.story) {
      if (this.options.figma) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const fileInfo = this.fileInfo!
        const specUrl = getComponentSpecUrl(fileInfo, this.options)
        this.fs.copyTpl(
          this.templatePath('figma.lock.ts.ejs'),
          this.destinationPath(`${this.componentPath}/figma.lock.ts`),
          {
            url: specUrl,
            id: this.options.id,
            themes: objToArr(this.options.themes ?? {}).map((theme) => ({
              ...theme,
              url: getComponentSpecUrl(fileInfo, this.options, theme.theme),
            })),
          }
        )
      }
      this.fs.copyTpl(
        this.templatePath('component.stories.tsx.ejs'),
        this.destinationPath(`${this.componentPath}/${this.options.snakifiedName}.stories.tsx`),
        {
          compName,
          compFileName: this.options.snakifiedName,
          title: storyTitle,
          variants,
          figma: this.options.figma,
        }
      )
    }
    const tokens = this.options.tokens ?? {}
    this.fs.copyTpl(
      this.templatePath('component.module.css.ejs'),
      this.destinationPath(`${this.componentPath}/${cssFileName}`),
      {
        states: (this.options.states ?? []).filter((s) => s !== 'default'),
        mainClassName,
        tokens: Object.keys(tokens).map((key) => ({
          key,
          name: `--${camelize(`${compName} ${key}`)}`,
          value: `--${SDConfig.platforms.css.prefix}-${kebabCase((tokens as Record<string, string>)[key])}`,
        })),
      }
    )
    this.fs.copyTpl(this.templatePath('index.ts.ejs'), this.destinationPath(`${this.componentPath}/index.ts`), {
      compFileName: this.options.snakifiedName,
      compName,
    })
    const indexFilePath = `${this.componentsRoot}/index.ts`
    const exportLine = `export * from './${this.options.snakifiedName}'\n`
    let exportFound = false
    const indexExists = this.fs.exists(indexFilePath)
    if (indexExists) {
      const file = this.fs.read(indexFilePath)
      exportFound = file.includes(exportLine)
    }
    if (!indexExists) {
      this.fs.write(indexFilePath, exportLine)
    } else if (!exportFound) {
      this.fs.append(indexFilePath, exportLine, {})
    }
  }
}

export default StorybookGenerator
