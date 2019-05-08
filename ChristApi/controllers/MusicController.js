const {Music, Sequelize}  = require('../models/Music')
const {Album, sequelize} = require('../models/Album')
module.exports =  class MusicController {
  // 获取下一首播放的歌曲
  static async nextMusic(ctx, next) {
    // 1 单曲循环 2 列表循环
    let { music_id, playType = 2 } =  ctx.query;

    if(music_id){
      const music = await Music.findOne({
        where: {
          id:music_id
        }
      })

      let nextMusic =  await Music.findOne({
        where: {
          album_id: music.album_id,
          id: {
            [Sequelize.Op.gt]: music_id
          }
        }
      })

      // 如果没有音乐
      if ( !nextMusic) {
        ctx.body = {
          code: 50000,
          message: '当前专辑已播放完',
          data:{}
        }
        return 
      }

      ctx.body = {
        code: 20000,
        message: '获取成功',
        data: nextMusic
      }
      return
    }

    ctx.body = {
      code: 50000,
      message: '当前专辑已播放完',
      data:{}
    }
  }
  // 获取列表
  static async minilist(ctx, next){
    const { maxId =  -1, minId = -1, album_id, limit = 20 } = ctx.query
    //  查询
    const where = {
      is_delete: false,
    }

    if(album_id) {
      where.album_id =  album_id
    }

    if(maxId != -1) {
      where.id = {
        [Sequelize.Op.lt]: maxId
      }
    }else if(minId != -1){
      where.id = {
        [Sequelize.Op.gt]: minId
      }
    }

    const data = await Music.findAndCountAll({
      attributes:{
        exclude: ['is_delete']
      },
      where: where,
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
    
    const result = await sequelize.transaction(t => {
      return (async () => {
        const lastMusict = await Music.create({
          ...data
        }, {transaction:t})

        if (data.album_id) {
          const count = await Music.count({
            where: {
              album_id: data.album_id
            }
          }, {transaction: t})

          await Album.update({
            music_count: count + 1
          },{
            where: {
              id: data.album_id
            }
          },{transaction:t})
        }
        return lastMusict
      })()
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

    await sequelize.transaction(t => {
      return (async ()=>{
        // 查询数据
        const album = await Album.findOne({
          where: {
            id: id
          }
        },{transaction:t})

        // 判断id是否相同 如果不相同两个都要更新
        if (data.album_id && album.id !== data.album_id) {
          Album.increment('music_count',{
            by: 1,
            where: {
              id:data.album_id
            }
          },{ transaction: t})

          Album.decrement('music_count',{
            by:1,
            where: {
              id:album.id
            }
          },{ transaction: t})
        }

        // 修改数据
        return await Music.update(data,{
          where: {
            id:id
          }
        })
      })()
    })

    ctx.body = {
      code:20000,
      message:'修改成功'
    }
  }
}