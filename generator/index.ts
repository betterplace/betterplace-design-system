import Generator from 'yeoman-generator'
import { camelize, snakeify } from '../figma/lib/helpers'

interface GeneratorOpts {
  name: string
}
interface Opts extends GeneratorOpts {
  camelizedName: string
  snakifiedName: string
}

class StorybookGenerator extends Generator<GeneratorOpts> {
  options: Opts

  constructor(args: string | string[], opts: GeneratorOpts) {
    super(args, opts)
    this.options.camelizedName = camelize(this.options.name)
    this.options.snakifiedName = snakeify(this.options.camelizedName)
    this.argument('name', {
      required: true,
      type: String,
      description: 'The name of the component',
    })
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('./templates/component.tsx.tpl'),
      this.destinationPath(`src/lib/${this.options.snakifiedName}/${this.options.snakifiedName}.tsx`)
    )
    this.fs.copyTpl(
      this.templatePath('./templates/component.test.tsx.tpl'),
      this.destinationPath(`src/lib/${this.options.snakifiedName}/${this.options.snakifiedName}.tsx`)
    )
    this.fs.copyTpl(
      this.templatePath('./templates/component.stories.tsx.tpl'),
      this.destinationPath(`src/lib/${this.options.snakifiedName}/${this.options.snakifiedName}.tsx`)
    )
  }
}

export default StorybookGenerator
