const {Role,Sequelize} = require('../models/permission/Role')
const validator = require('validator')
const md5 =  require('md5')
const uuidv4 =  require('uuid/v4')

module.exports =  class RoleController {
   
  // 获取路由
  static async routes(ctx, next){
    const { constantRoutes, asyncRoutes } = require('../config/routes')
    ctx.body = {
      code: 20000,
      message: '成功',
      data: constantRoutes.concat(asyncRoutes)
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
      attributes:{
        exclude: ['is_delete']
      },
      where:{
        is_delete: false
      }
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
    const id = data.id
    delete data.id

    data.updatedAt = new Date()
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
}