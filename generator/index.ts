import Generator from 'yeoman-generator'
import { ComponentInfo } from '../figma/lib/fetch_components'
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

  constructor(args: string | string[], opts: Opts) {
    super(args, opts)
    this.argument('name', {
      required: true,
      type: String,
      description: 'The name of the component',
    })
    this.argument('figma', { required: false, type: Number, description: 'Link with Figma component' })
    this.options.camelizedName = camelize(this.options.name)
    this.options.snakifiedName = snakeify(this.options.camelizedName)
  }

  writing() {
    const componentPath = `src/lib/components/${this.options.snakifiedName}`
    const types = generateComponentPropTypes(this.options)
    this.fs.write(`${componentPath}/types.ts`, types)
    this.fs.copyTpl(
      this.templatePath('./templates/component.tsx.ejs'),
      this.destinationPath(`${componentPath}/${this.options.snakifiedName}.tsx`)
    )
    this.fs.copyTpl(
      this.templatePath('./templates/component.test.tsx.ejs'),
      this.destinationPath(`${componentPath}/$${this.options.snakifiedName}.test.tsx`)
    )
    this.fs.copyTpl(
      this.templatePath('./templates/component.stories.tsx.ejs'),
      this.destinationPath(`${componentPath}/$/${this.options.snakifiedName}.stories.tsx`)
    )
    this.fs.copyTpl(
      this.templatePath('./templates/component.module.css.ejs'),
      this.destinationPath(`${componentPath}/${this.options.snakifiedName}.module.css`)
    )
  }
}

export default StorybookGenerator
