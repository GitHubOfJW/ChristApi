const { Member, Sequelize } = require('../models/Member')
const { RoleRuleRel } = require('../models/permission/RoleRuleRel')
const { Rule } = require('../models/permission/Rule')
const path =  require('path')
const { Album }  = require('../models/Album')

module.exports = class IndexController {

  // 检查权限
  static async checkAuth(ctx, next){
    // 获取当前账号
    const member = await Member.findOne({
      where: {
        id: ctx.session.id
      }
    })
    // 如果是超级管理员，直接返回可以
    if (member.is_admin) {
      ctx.body = {
        code: 20000,
        message: '成功',
        data: {
          auth: true
        }
      }
      return
    }
    // 具体判断
    const queryIndex = ctx.url.indexOf('?')
    const path = ctx.url.substring(0, queryIndex >= 0 ? queryIndex -1 : ctx.url.length - 1)
    // 查询有没有这个规则
    const rule = await Rule.findOne({
      where: {
        path: path
      }
    })
    // 如果没有
    if (!rule) {
      ctx.body = {
        code: 20000,
        message: '成功',
        data: {
          auth: true
        }
      }
      return
    }

    // 如果有规则
    const rel = await RoleRuleRel.findOne({
      where: {
        rule_id: rule.id,
        role_id: member.role_id,
        is_delete: false
      }
    })

    ctx.body = {
      code: 20000,
      message: '成功',
      data: {
        auth: !!rel
      }
    }
  }
 
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

  static getTopMenus(ctx) {
    const data = [{
      imgSrc: ctx.state.G.url + '/images/qrcode.png',
      title: '扫码分享',
      type: 'wxacode',
      content: ''
    },{
      imgSrc:  ctx.state.G.url + '/images/awared.png',
      title: '打赏声明',
      type: 'prompt',
      content: '本人也是一名基督徒，为了给各位弟兄姊妹提供方便，利用业余时间开发了这款程序，由于本程序也花费了不少精力和一些成本，如果帮到了您，希望您能给点打赏！'
    },{
      imgSrc: ctx.state.G.url + '/images/mzsm.png',
      title: '免责声明',
      type: 'prompt',
      content: '本程序中的许多资源都是来自网络，如若侵犯了您的版权，还请通知下线，本程序中的任何资源不做任何商业用途！'
    }]
    return data
  }

  static async miniIndex(ctx, next) {
    const { page = 1 } = ctx.request.body
    const { page_size = 10 } = ctx.request.body
    // 专辑列表
    const albums = await Album.findAndCountAll({
      offset: (page - 1) * page_size,
      limit: page_size
    })

    // 返回数据
    ctx.body = {
      code: 20000,
      message: "成功",
      data: {
        albums,
        menus: IndexController.getTopMenus(ctx)
      }
    }
  }
}