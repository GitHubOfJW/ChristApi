const Member = require('../models/Member')
const path =  require('path')

module.exports = class IndexController {
 
  // 上传照片
  static async upload(ctx, next){
    const destination = ctx.req.file.destination
    const path = destination.substring(destination.indexOf('/public')+'/public'.length)
    ctx.body = {
      code: 20000,
      message: '上传成功',
      data: {
        filename:ctx.req.file.filename,
        url: ctx.state.G.url + (path + ctx.req.file.filename).replace('//','/')
      }
    }
  }
}