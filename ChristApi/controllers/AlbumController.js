const {Album, Sequelize}  = require('../models/Album')
module.exports =  class AlbumController {
  // 获取列表
  static async list(ctx, next){
    //  查询
    const data = await Album.findAndCountAll({
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
    delete data.id
    
    // 创建
    const result = await Album.create({
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
    await Album.update(data,{
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