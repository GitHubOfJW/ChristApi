const path = require('path')
const fs = require('fs')
module.exports = function(){
  return async (ctx, next) => {
    const index = ctx.url.indexOf('/stream')
    if(index >= 0) {
      const url = ctx.url.substr(index + '/stream'.length)
      const fileUrl = path.join(__dirname, '../public',url)
      ctx.set('Content-Type', 'audio/mpeg')
      ctx.body = fs.readFileSync(fileUrl)
      return
    }
    await next()
  }
}