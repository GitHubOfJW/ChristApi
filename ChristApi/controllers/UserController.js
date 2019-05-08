const fetch =  require('node-fetch')
const bluebird =  require('bluebird')
fetch.Promise = bluebird
const { appInfo } = require('../config')
const { User, Sequelize } = require('../models/User')

module.exports =  class UserController {
  // 小程序登录
  static async minlogin (ctx, next) {
    const { code } = ctx.query
    const res = await fetch(`https://api.weixin.qq.com/sns/jscode2session?appid=${appInfo.appid}&secret=${appInfo.secret}&js_code=${code}&grant_type=authorization_code`)
    const json = await res.json()
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
}