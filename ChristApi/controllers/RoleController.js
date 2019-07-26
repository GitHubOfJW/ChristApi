const {Role,Sequelize} = require('../models/permission/Role')
const {RoleRuleRel} =  require('../models/permission/RoleRuleRel')
const {Rule} = require('../models/permission/Rule')

const validator = require('validator')
const md5 =  require('md5')
const uuidv4 =  require('uuid/v4')

Role.belongsToMany(Rule, {
  through: 'role_rule_rels',
  foreignKey: 'role_id',
  as: 'rules',
  constraints: false
})

Rule.belongsToMany(Role, {
  through: 'role_rule_rels',
  foreignKey: 'rule_id',
  as: 'roles',
  constraints: false
})

module.exports =  class RoleController {
   
  // 获取路由
  static async routes(ctx, next){
    const { constantRoutes, asyncRoutes } = require('../configs/routes')
    ctx.body = {
      code: 20000,
      message: '成功',
      data: asyncRoutes
    }
  }

  // 角色
  static async getRoles(ctx, next){
    const data = await Role.findAndCountAll()
    ctx.body = {
      code: 20000,
      message: '成功',
      data: {
        items: data.rows,
        total: data.count
      }
    }
  }

  // 获取列表
  static async list(ctx, next){
    //  查询
    const data = await Role.findAndCountAll({
      // attributes:{
      //   exclude: ['is_delete']
      // },
      include: [{
        model: Rule,
        through: 'role_rule_rels',
        as: "rules"
      }],
      // where:{
      //   is_delete: false
      // }
    })

    ctx.body = {
      code: 20000,
      message: '获取成功',
      data: {
        items:data.rows,
        total:data.count
      }
    }
  }

  // 创建管理员
  static async create(ctx, next){
    const  data =  ctx.request.body
    data.role_key = uuidv4().substring(0,8)
    delete data.id
 
    // 创建
    const result = await Role.create({
      ...data
    })

    await RoleRuleRel.bulkCreate(data.rules.map(ruleId => {
      return {
        rule_id: ruleId,
        role_id: result.id
      }
    }))

    ctx.body = {
      code:20000,
      message: '创建成功',
      data: {
        id: result.id,
        role_key: data.role_key
      }
    }
  }

  // 修改管理员
  static async update(ctx, next){
    const data =  ctx.request.body
    delete data.is_delete
    delete data.createAt
    delete data.role_id
    delete data.role_key
    delete data.token
    delete data.avatar
    const id = ctx.params.id
    delete data.id

    data.updatedAt = new Date()
    // 查寻所有的权限
    const rels = await RoleRuleRel.findAll({
      where: {
        role_id: id
      }
    })

    // 删除不在选中范围内的数据
    await RoleRuleRel.destroy({
      where: {
        role_id: id,
        rule_id: {
          [Sequelize.Op.notIn]: data.rules
        }
      }
    })

     // 遍历
     for(let i = data.rules.length - 1; i >=0; i--){
      const ruleId = data.rules[i];
      for(let rel of rels){
        // 如果
        if (ruleId === rel.rule_id) {
          data.rules.splice(i, 1)
          break;
        }
      }
    }
    if(data.rules.length > 0){
      await RoleRuleRel.bulkCreate(data.rules.map(ruleId => {
        return {
          rule_id: ruleId,
          role_id: id
        }
      }))
    }

    // 修改数据
    await Role.update(data,{
      where: {
        id:id
      }
    })
    ctx.body = {
      code:20000,
      message:'修改成功'
    }
  }

   // 删除
   static async delete(ctx, next) {
    const id = ctx.params.id
    await Role.update({
      is_delete: true
    }, {
      where: {
        id: id
      }
    })

    ctx.body = {
      code: 20000,
      message: '删除成功'
    }
  }

  // 删除
  static async recover(ctx, next) {
    const id = ctx.params.id
    await Role.update({
      is_delete: false
    }, {
      where: {
        id: id
      }
    })

    ctx.body = {
      code: 20000,
      message: '恢复成功'
    }
  }
}