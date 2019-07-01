const {Album, Sequelize}  = require('../models/Album')
const { removeFileFlag, addFileFlag } = require('../utils/fileTool')

module.exports =  class AlbumController {

  // 获取专辑
  static async fineOne(ctx, next) {
    if(!ctx.params.id){
      ctx.body = {
        code: 50000,
        message: '失败'
      }
      return
    }
    // 查询专辑
    const album = await Album.findOne({
      where: {
        id: ctx.params.id
      }
    })
    
    ctx.body = {
      code: 20000,
      message: '成功',
      data: album
    }

  }

  // 获取列表
  static async getAlbums(ctx, next){
    //  查询
    const data = await Album.findAndCountAll({
      // attributes:{
      //   exclude: ['is_delete']
      // },
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

  // 获取列表
  static async list(ctx, next){
    const page = ctx.query.page || 1
    const limit = ctx.query.limit || 20
    //  查询
    const data = await Album.findAndCountAll({
      // attributes:{
      //   exclude: ['is_delete']
      // },
      where:{
        is_delete: false,
        // is_show: true
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
    removeFileFlag(data.thumb_url)
    removeFileFlag(data.big_url)

    if (data.thumb_url) {
      data.thumb_url = data.thumb_url.substr(data.thumb_url.indexOf('/upload')).replace('_n', '')
    }
    if (data.big_url) {
      data.big_url = data.big_url.substr(data.big_url.indexOf('/upload')).replace('_n', '')
    }

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

    const oldAlbum = await Album.findOne({
      where: {
        id: id
      }
    });
    // 如果图不一样了，那么就加回标记
    if (oldAlbum.thumb_url !== data.thumb_url) {
      addFileFlag(oldAlbum.thumb_url)
    }
    if (oldAlbum.big_url !== data.big_url) {
      addFileFlag(oldAlbum.big_url)
    }
    

    if (data.thumb_url) {
      removeFileFlag(data.thumb_url)
      data.thumb_url = data.thumb_url.substr(data.thumb_url.indexOf('/upload')).replace('_n', '')
    }
    if (data.big_url) {
      removeFileFlag(data.big_url)
      data.big_url = data.big_url.substr(data.big_url.indexOf('/upload')).replace('_n', '')
    }
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

  // 删除
  static async delete(ctx, next) {
    const id = ctx.params.id
    await Album.update({
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
    await Album.update({
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