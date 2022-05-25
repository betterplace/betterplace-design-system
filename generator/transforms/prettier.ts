import Prettier from 'prettier'
import Through from 'through2'

export const prettierTransform = function () {
  const transform: Through.TransformFunction = (file, _, callback) => {
    /* resolve from the projects config */
    Prettier.resolveConfig(file.relative).then((options) => {
      const str = file.contents.toString('utf8')
      if (!options || Object.keys(options).length === 0) {
        options = {}
      }
      // for better errors
      options.filepath = file.relative
      const data = Prettier.format(str, options)
      file.contents = Buffer.from(data)
      callback(null, file)
    })
  }
  return Through.obj(transform)
}
