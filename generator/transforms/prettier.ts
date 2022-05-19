import prettier from 'prettier'
import through from 'through2'

export const prettierTransform = function () {
  const transform = (file, _, callback) => {
    /* resolve from the projects config */
    prettier.resolveConfig(file.relative).then((options) => {
      const str = file.contents.toString('utf8')
      if (!options || Object.keys(options).length === 0) {
        options = {}
      }
      // for better errors
      options.filepath = file.relative
      const data = prettier.format(str, options)
      file.contents = Buffer.from(data)
      callback(null, file)
    })
  }
  return through.obj(transform)
}
