const fs = require('fs')
const { join, resolve } = require('path')
const del = require('del')
const crypto = require('crypto')
const postcss = require('postcss')
const sprites = require('postcss-sprites')
const glob = require('glob')

glob(resolve(__dirname, '../build/*.css'), {}, (err, files) => {
  files.forEach(file => {
    const css = fs.readFileSync(file, 'utf8')
    const spritesOpt = {
      stylesheetPath: resolve(__dirname, '../build'),
      spritePath: resolve(__dirname, '../build'),
      retina: true,
      verbose: true,
      hooks: {
        onSaveSpritesheet: (opts, spritesheet) => {
          const sourceImages = Object.keys(spritesheet.coordinates)
          const filename = crypto.createHmac('sha512', Math.random().toString()).digest('hex').slice(0, 8)

          del(sourceImages)

          return join(opts.spritePath, filename + '.' + spritesheet.extension)
        }
      }
    }

    postcss([ sprites(spritesOpt) ])
      .process(css, { from: file, to: file })
      .then(result => {
        fs.writeFileSync(file, result.css)
      })
  })
})
