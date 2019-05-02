const {Music, Sequelize}  = require('../models/Music')
module.exports =  class MusicController {
  // 获取列表
  static async list(ctx, next){
    const page = ctx.query.page || 1
    const limit = ctx.query.limit || 20
    //  查询
    const data = await Music.findAndCountAll({
      attributes:{
        exclude: ['is_delete']
      },
      where:{
        is_delete: false
      },
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
    const result = await Music.create({
      ...data
    })

    ctx.body = {
      code:20000,
      message: '创建成功',
      data: {
        id: result.id,
      }
    }
  }

  // 修改管理员
  static async update(ctx, next){
    const data =  ctx.request.body
    delete data.is_delete
    delete data.createAt
    const id = data.id
    delete data.id

    data.updatedAt = new Date()
    // 修改数据
    await Music.update(data,{
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