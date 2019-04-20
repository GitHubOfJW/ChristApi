const Member = require('../models/Member')

module.exports = class IndexController {

  // default 默认根目录
  static async index(ctx, next){
    
    await ctx.render('index', {
      title: 'Hello Koa 2!'
    })
  }
}