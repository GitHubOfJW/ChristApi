const fetch =  require('node-fetch')
const { appInfo } = require('../config')
const { User, Sequelize } = require('../models/User')

module.exports =  class UserController {
  // 小程序登录
  static async minlogin (ctx, next) {
    const { code } = ctx.query    
    const data = await ctx.get('https://api.weixin.qq.com/sns/jscode2session',
    {
      'appid': appInfo.appid,
      'secret': appInfo.secret,
      'js_code': code,
      'grant_type':'authorization_code'
    })
    const json = JSON.parse(data)
    if(!json.openid) {
      ctx.body = {
        code: 5000,
        message: '未获取到openid'
      }
      return
    }
    let user = await User.findOne({
      where: {
        openid: json.openid
      }
    })
    // 如果没有就添加
    if (!user) {
      // 获取到openid session_key
      user = await User.create({
        openid: json.openid,
        session_key: json.session_key
      })
    } else {
      await User.update({
        session_key: json.session_key
      },{
        where: {
          openid: json.openid
        }
      })
    }
    ctx.body = {
      code:20000,
      message:'成功',
      data: {
        openid: json.openid
      }
    }
  }


  // 更新信息
  static async update (ctx, next) {
    const id =  ctx.params.id
    const body =  ctx.request.body
    await User.update(body,{
      where: {
        openid: id
      }
    })
    
    const user = await User.findOne({
      where: {
        openid: id
      }
    })
    ctx.body = {
      code: 20000,
      message: '成功',
      data: {
        edit_lrc: user ? user.edit_lrc : false
      }
    }
  }
}