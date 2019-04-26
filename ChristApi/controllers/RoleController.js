const {Role,Sequelize} = require('../models/permission/Role')
const validator = require('validator')
const md5 =  require('md5')
const uuidv4 =  require('uuid/v4')

module.exports =  class RoleController {
   

  // 获取列表
  static async list(ctx, next){
    const page = ctx.query.page || 1
    const limit = ctx.query.limit || 20
    const  { gender = false, mobile = '', name = '', wechat = '', qq = '', sort = '+id' } = ctx.query
    const orders = ('+parent_id,'+sort).split(',')
    const orderby = []
    for(let sortItem of orders){
       orderby.push([Sequelize.col(sortItem.substring(1)),sortItem.startsWith('+') ? 'ASC':'DESC'])
    }
    //  查询
    const data = await Role.findAndCountAll({
      attributes:{
        exclude: ['is_delete']
      },
      where:{
        is_delete: false,
        parent_id: {
          [Sequelize.Op.notIn]: [0]
        }
        // mobile: {
        //   [Sequelize.Op.like]: `${ mobile }%`,
        // },
        // wechat: {
        //   [Sequelize.Op.like]: `${ wechat }%`,
        // },
        // qq: { 
        //   [Sequelize.Op.like]: `${ qq }%`,
        // },
        // name:{
        //   [Sequelize.Op.like]: `%${ name }%`,
        // },
        // gender:{
        //   [Sequelize.Op.in]:gender < 0 ? [true,false]:[gender==0]
        // }
      },
      order:orderby,
      offset: ((page-1) * limit)+0,
      limit: parseInt(limit)
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
    delete data.id
    
    // 创建
    const result = await Rule.create({
      ...data
    })

    ctx.body = {
      code:20000,
      message: '创建成功',
      data: {
        id: result.id
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
    await Rule.update(data,{
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