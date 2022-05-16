import Generator from 'yeoman-generator'
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
    return fetch('../config/components.json')
      .then((r) => r.json())
      .then((d) => {
        this.fileInfo = d.meta.file
      })
  }

  writing() {
    const componentPath = `src/lib/components/${this.options.snakifiedName}`
    const types = generateComponentPropTypes(this.options)
    const cssFileName = `${componentPath}/${this.options.snakifiedName}.module.css`
    const compFileName = `${componentPath}/${this.options.snakifiedName}.tsx`
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const specUrl = getComponentSpecUrl(this.fileInfo!, this.options)
    const storyTitle = ['Components', this.options.frameName, this.options.name].filter(Boolean).join('/')
    this.fs.write(`${componentPath}/types.ts`, types)
    this.fs.copyTpl(this.templatePath('./templates/component.tsx.ejs'), this.destinationPath(compFileName), {
      propsName: `${this.options.camelizedName}Props`,
      cssFileName,
      componentName: this.options.camelizedName,
    })
    this.fs.copyTpl(
      this.templatePath('./templates/component.test.tsx.ejs'),
      this.destinationPath(`${componentPath}/$${this.options.snakifiedName}.test.tsx`)
    )
    this.fs.copyTpl(
      this.templatePath('./templates/component.stories.tsx.ejs'),
      this.destinationPath(`${componentPath}/$/${this.options.snakifiedName}.stories.tsx`),
      {
        specUrl,
        compName: this.options.camelizedName,
        compFileName,
        title: storyTitle,
      }
    )
    this.fs.copyTpl(this.templatePath('./templates/component.module.css.ejs'), this.destinationPath(cssFileName), {
      states: (this.options.states ?? []).filter((s) => s !== 'default'),
    })
  }
}

export default StorybookGenerator
