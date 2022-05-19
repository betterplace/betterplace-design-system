import Generator from 'yeoman-generator'
import { ComponentInfo, FileInfo, getComponentSpecUrl, PropData, Props, PropType } from '../figma/lib/fetch_components'
import { camelize, objToArr, snakeify } from '../figma/lib/helpers'
import Fuse from 'fuse.js'
import { prettierTransform } from './transforms'

interface GeneratorOpts {
  name: string
  root?: string
  figma?: boolean
  story?: boolean
  test?: boolean
}
type Opts = GeneratorOpts &
  ComponentInfo & {
    camelizedName: string
    snakifiedName: string
  }
type Variant = { name: string; values: Record<string, any> }
function getValue(type?: PropType): any {
  switch (type) {
    case 'boolean':
      return true
    case 'number':
      return 1
    case 'string':
      return 'Lorem ipsum'
    case 'object':
      return {}
    case 'array':
      return []
    case 'null':
      return null
    default:
      return
  }
}
// function createVariants(props: Props) {
//   const resHash: Record<string, Variant> = {}
//   const arr = objToArr(props).sort(({ required: a }, { required: b }) => +a - +b)
//   const count = arr.length
//   if (!count) return []
//   arr.forEach((outer, i) => {
//     const key = ''
//     arr.forEach((inner, j) => {
//       if (inner.name === outer.name) return
//     })
//     // const value = values?.[0] ?? getValue(type?.[0]) ?? ;
//     // const key = name + '-' + values?[0] ?? (getValue(type?[0])) ?? {}
//   })
//   return objToArr(resHash)
// }

class StorybookGenerator extends Generator<GeneratorOpts> {
  options: Opts
  fileInfo?: FileInfo
  componentPath: string
  componentsRoot: string

  constructor(args: string | string[], opts: Opts) {
    super(args, opts)
    this.argument('name', {
      required: true,
      type: String,
      description: 'The name of the component',
    })
    this.option('figma', { type: Boolean, description: 'Link with Figma component' })
    this.option('root', {
      type: String,
      description: 'Specifies components root',
    })
    this.options = { ...opts, props: opts.props ?? {} }
    this.options.camelizedName = camelize(this.options.name)
    this.options.snakifiedName = snakeify(this.options.camelizedName)
    if (this.options.root) {
      this.destinationRoot(this.options.root)
    }
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
    let figma: ComponentInfo
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
    this.options = { ...this.options, ...figma }
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
      }
    )
    if (this.options.story) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const fileInfo = this.fileInfo!
      const specUrl = getComponentSpecUrl(fileInfo, this.options)
      this.fs.copyTpl(
        this.templatePath('figma.lock.ts.ejs'),
        this.destinationPath(`${this.componentPath}/figma.lock.ts`),
        {
          url: specUrl,
          id: this.options.id,
          themes:
            this.options.themes &&
            objToArr(this.options.themes).map((theme) => ({
              ...theme,
              url: getComponentSpecUrl(fileInfo, this.options, theme.theme),
            })),
        }
      )

      this.fs.copyTpl(
        this.templatePath('component.stories.tsx.ejs'),
        this.destinationPath(`${this.componentPath}/${this.options.snakifiedName}.stories.tsx`),
        {
          compName,
          compFileName: this.options.snakifiedName,
          title: storyTitle,
          variants: objToArr(this.options.props).map(({ name }) => ({ name, values })),
        }
      )
    }
    this.fs.copyTpl(
      this.templatePath('component.module.css.ejs'),
      this.destinationPath(`${this.componentPath}/${cssFileName}`),
      {
        states: (this.options.states ?? []).filter((s) => s !== 'default'),
        mainClassName,
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
  re
}

export default StorybookGenerator
