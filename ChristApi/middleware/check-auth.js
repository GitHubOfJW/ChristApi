const {Member,Sequelize} =  require('../models/Member')
const { RoleRuleRel } = require('../models/permission/RoleRuleRel')
const { Rule } = require('../models/permission/Rule')
module.exports =  function(){
  return async (ctx, next) => {
    if(ctx.url.indexOf('/login') || ctx.url.indexOf('/mini')){
      await next()
      return
    }
    // 获取当前账号
    const member = await Member.findOne({
      where: {
        id: ctx.session.id
      }
    })
    // 如果是超级管理员，直接返回可以
    if (member.is_admin) {
      await next()
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
      await next()
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

    if (rel) {
      await next()
      return
    }

    ctx.body = {
      code: 50000,
      message: '暂无权限',
      data: {
        auth: !!rel
      }
    }
  }
}