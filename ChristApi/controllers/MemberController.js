const {Member,Sequelize} = require('../models/Member')
const validator = require('validator')
const md5 =  require('md5')
const uuidv4 =  require('uuid/v4')
module.exports =  class MemberController {
  
  // 用户登录
  static async login(ctx, next){
    const {username, password } = ctx.request.body
    // 账号
    if(validator.isEmpty(username)){
      ctx.body = {
        code:5000,
        message:'用户名'
      }
      return
    }else if(validator.isEmpty(password)){
      ctx.body = {
        code:5000,
        message:'失败'
      }
      return
    }else if(!validator.isMobilePhone(username,'zh-CN',false)){
      ctx.body = {
        code:5000,
        username,
        message:'失败'
      }
      return
    }

    // 会员登录返回tokan
    const member = await Member.findOne({
      where:{
        mobile:`${username.trim()}`,
        password:`${md5(md5(password.trim()))}`
      }
    })

    // 获取到账号信息
    if(member){
      const token =  uuidv4()
      member.token =token
      await member.save()
      ctx.body = {
        code:20000,
        message:'成功',
        data:{
          token:token
        }
      }
    }else{ // 未获取到
      ctx.body = {
        code:5000,
        message:'用户名或密码不存在'
      }
    }
  }

  // 获取信息
  static async info(ctx, next){
    // console.log(ctx.request.params,ctx.request.query)
    const { token } = ctx.request.query
    if(validator.isEmpty(token)){
      ctx.body = {
        code:5000,
        message:'缺少token参数'
      }
      return
    }
    
    // 获取用户信息
    const member = await Member.findOne({
      where:{
        token:token
      }
    })

    // 存在
    if(member){
      ctx.body = {
        code:20000,
        message:'成功',
        data:member
      }
    }else{
      ctx.body = {
        code:5008,
        message:'非法的token'
      }
    }
  }
}