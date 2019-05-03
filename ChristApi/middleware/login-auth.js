// 中间件获取到session，如果session中有token，说明登录状态
// 如果session 中的token 表中不存在，说明异地登录
const validator = require('validator')
const {Member,Sequelize} =  require('../models/Member')
module.exports =  function(){
  return async (ctx,next) => {
    if(ctx.url.indexOf('/login') || ctx.url.indexOf('/mini')){
      await next()
      return
    }
    // 获取session 如果是空的
    if(validator.isEmpty(ctx.session.token)){
      // 没有登录
      ctx.body = {
        code:50014,
        message:'会话已过期'
      }
      return
    }else{
      const count = await Member.count({
        where:{
          token:`${ctx.session.token.trim()}`
        },
        offset:1
      })
      // 账号异地登录
      if(count <= 0){
        ctx.body = {
          code:50012,
          message:'其他账号登录'
        }
        return
      }
    }
    await next()
  }
}