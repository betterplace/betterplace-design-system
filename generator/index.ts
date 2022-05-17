import Generator from 'yeoman-generator'
import fetch from 'isomorphic-unfetch'
import { ComponentInfo, FileInfo, getComponentSpecUrl } from '../figma/lib/fetch_components'
import generateComponentPropTypes from '../figma/lib/generate_component_prop_types'
import { camelize, snakeify } from '../figma/lib/helpers'

interface GeneratorOpts {
  name: string
  figma: boolean
}
type Opts = GeneratorOpts &
  ComponentInfo & {
    camelizedName: string
    snakifiedName: string
  }

class StorybookGenerator extends Generator<GeneratorOpts> {
  options: Opts
  fileInfo?: FileInfo

  constructor(args: string | string[], opts: Opts) {
    super(args, opts)
    this.argument('name', {
      required: true,
      type: String,
      description: 'The name of the component',
    })
    this.options = { ...opts, props: opts.props ?? {} }
    this.argument('figma', { required: false, type: Number, description: 'Link with Figma component' })
    this.options.camelizedName = camelize(this.options.name)
    this.options.snakifiedName = snakeify(this.options.camelizedName)
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

  writing() {
    const componentPath = `src/lib/components/${this.options.snakifiedName}`
    const types = generateComponentPropTypes(this.options)
    const cssFileName = `${this.options.snakifiedName}.module.css`
    const compFileName = `${this.options.snakifiedName}.tsx`
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const specUrl = getComponentSpecUrl(this.fileInfo!, this.options)
    const storyTitle = ['Components', this.options.frameName, this.options.name].filter(Boolean).join('/')
    const mainClassName = `${this.options.camelizedName}Main`
    const compName = camelize(this.options.name, true)
    this.fs.write(`${componentPath}/types.ts`, types)
    this.fs.copyTpl(this.templatePath('component.tsx.ejs'), this.destinationPath(`${componentPath}/${compFileName}`), {
      propsName: `${compName}Props`,
      cssFileName,
      componentName: compName,
      mainClassName,
    })
    this.fs.copyTpl(
      this.templatePath('component.test.tsx.ejs'),
      this.destinationPath(`${componentPath}/${this.options.snakifiedName}.test.tsx`),
      {
        compName,
        compFileName: this.options.snakifiedName,
        compFullName: this.options.name,
      }
    )
    this.fs.copyTpl(
      this.templatePath('component.stories.tsx.ejs'),
      this.destinationPath(`${componentPath}/${this.options.snakifiedName}.stories.tsx`),
      {
        specUrl,
        compName,
        compFileName: this.options.snakifiedName,
        title: storyTitle,
      }
    )
    this.fs.copyTpl(
      this.templatePath('component.module.css.ejs'),
      this.destinationPath(`${componentPath}/${cssFileName}`),
      {
        states: (this.options.states ?? []).filter((s) => s !== 'default'),
        mainClassName,
      }
    )
  }
}

export default StorybookGenerator
