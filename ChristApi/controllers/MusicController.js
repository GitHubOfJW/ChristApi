const {Music, Sequelize}  = require('../models/Music')
const {Album, sequelize} = require('../models/Album')
const {Favorite} = require('../models/Favorite')
const {removeFileFlag,addFileFlag } = require('../utils/fileTool')

Music.hasOne(Favorite,{
  foreignKey: 'music_id',
  constraints: false
})

Music.belongsTo(Album,{
  foreignKey: 'album_id',
  constraints: false
})

module.exports =  class MusicController {

  // 获取音乐
  static async getById(ctx, next) {
    const id = ctx.params.id
    const music = await Music.findOne({
      where: {
        id: id
      }
    })

    ctx.body = {
      code: 20000,
      data: music
    }
  }
  // 获取下一首播放的歌曲
  static async nextMusic(ctx, next) {
    // 1 单曲循环 2 列表循环
    let { music_id, playType = 2, durtion = 0} =  ctx.query;

    if(music_id){
      const music = await Music.findOne({
        where: {
          id:music_id
        },
        include: [{
          model: Favorite
        }]
      })

      // 累计
      await Music.update({
        time: durtion,
        play_count: music.play_count + 1
      }, {
        where: {
          id: music_id
        }
      })

      if (playType == 1) {
        ctx.body = {
          code: 20000,
          message: '获取成功',
          data: music
        }
        return
      }



      let nextMusic =  await Music.findOne({
        where: {
          album_id: music.album_id,
          num: {
            [Sequelize.Op.gt]: music.num
          }
        },
        order:[[Sequelize.col('num'), "ASC"]],
        include: [{
          model: Favorite
        }]
      })

      // 如果没有音乐
      if ( !nextMusic) {
        nextMusic =  await Music.findOne({
          where: {
            album_id: music.album_id,
          },
          include: [{
            model: Favorite
          }],
          limit:1
        })
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

  // 获取上一首播放的歌曲
  static async prevMusic(ctx, next) {
    // 1 单曲循环 2 列表循环
    let { music_id, playType = 2, durtion = 0 } =  ctx.query;

    if(music_id){
      const music = await Music.findOne({
        where: {
          id:music_id
        },
        include: [{
          model: Favorite
        }]
      })

      // 累计
      await Music.update({
        time: durtion,
        play_count: music.play_count + 1
      }, {
        where: {
          id: music_id
        }
      })
      
      if (playType == 1) {
        ctx.body = {
          code: 20000,
          message: '获取成功',
          data: music
        }
        return
      }

      let prevMusic =  await Music.findOne({
        where: {
          album_id: music.album_id,
          num: {
            [Sequelize.Op.lt]: music.num
          },
          order:[[Sequelize.col('num'), "DESC"]],
        },
        include: [{
          model: Favorite
        }]
      })

      // 如果没有音乐
      if ( !prevMusic) {
        prevMusic =  await Music.findOne({
          where: {
            album_id: music.album_id,
          },
          include: [{
            model: Favorite
          }],
          order:[[Sequelize.col('num'), "DESC"]],
          limit:1
        })
      }

      ctx.body = {
        code: 20000,
        message: '获取成功',
        data: prevMusic
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
        [Sequelize.Op.gt]: maxId
      }
    }else if(minId != -1){
      where.id = {
        [Sequelize.Op.lt]: minId
      }
    }

    const data = await Music.findAndCountAll({
      attributes:{
        exclude: ['is_delete']
      },
      where: where,
      limit: parseInt(limit),
      order:[[Sequelize.col('num'), "ASC"]],
      include: [{
        model: Favorite,
      }]
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

   // 获取收藏列表
   static async miniFavoriteList(ctx, next){
    const { page = 1, pageSize = 20 } = ctx.query
    //  查询
    const where = {
      is_delete: false,
    }

    const data = await Music.findAndCountAll({
      attributes:{
        exclude: ['is_delete']
      },
      where: where,
      limit: parseInt(pageSize),
      offset: parseInt((page -1)*pageSize),
      order:[[Sequelize.col('favorite.updatedAt'), "DESC"]],
      include: [{
        model: Favorite,
        where: {
          is_delete: false
        }
      },{
        model: Album,
        attributes: {
          include:['big_url']
        }
      }]
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
      // attributes:{
      //   exclude: ['is_delete']
      // },
      // where:{
      //   is_delete: false
      // },
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

    if(!data.lrc){
      data.has_lrc = false
    } else {
      // 有歌词
      data.has_lrc = true
      const lrcs = (data.lrc).split('\n')
      // 如果歌词中
      data.lrc_edit = false
      const tlrcs = []
      for(let item of lrcs) {
        if(item.indexOf('[') >= 0){
          if(item.indexOf('[0:0:0]') >= 0) {
            data.lrc_edit = true
          }
          tlrcs.push(item)
        }else{
          data.lrc_edit = true
          tlrcs.push(`[0:0:0]${item}`)
        }
      }
      data.lrc = tlrcs.join('\n')
    }
    
    removeFileFlag(data.thumb_url)
    removeFileFlag(data.source_url)
    removeFileFlag(data.big_url)

    if (data.thumb_url) {
      data.thumb_url = data.thumb_url.substr(data.thumb_url.indexOf('/upload')).replace('_n', '')
    }
    if (data.big_url) {
      data.big_url = data.big_url.substr(data.big_url.indexOf('/upload')).replace('_n', '')
    }
    if (data.source_url) {
      data.source_url = data.source_url.substr(data.source_url.indexOf('/upload')).replace('_n', '')
    }

    
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
    const id = ctx.params.id
    delete data.id

    const oldMusic = await Music.findOne({
      where: {
        id: id
      }
    })

    data.updatedAt = new Date()
 
    if(!data.lrc){
      data.has_lrc = false
    } else {
      // 有歌词
      data.has_lrc = true
      const lrcs = (data.lrc).split('\n')
      // 如果歌词中
      data.lrc_edit = false
      const tlrcs = []
      for(let item of lrcs) {
        if(item.indexOf('[') >= 0){
          if(item.indexOf('[0:0:0]') >= 0) {
            data.lrc_edit = true
          }
          tlrcs.push(item)
        }else{
          data.lrc_edit = true
          tlrcs.push(`[0:0:0]${item}`)
        }
      }
      data.lrc = tlrcs.join('\n')
    }
    
    // 如果图不一样了，那么就加回标记
    if (oldMusic.thumb_url !== data.thumb_url) {
      addFileFlag(oldMusic.thumb_url)
    }
    if (oldMusic.big_url !== data.big_url) {
      addFileFlag(oldMusic.big_url)
    }
    if (oldMusic.source_url !== data.source_url) {
      addFileFlag(oldMusic.source_url)
    }
    

    if (data.thumb_url) {
      removeFileFlag(data.thumb_url)
      data.thumb_url = data.thumb_url.substr(data.thumb_url.indexOf('/upload')).replace('_n', '')
    }
    if (data.big_url) {
      removeFileFlag(data.big_url)
      data.big_url = data.big_url.substr(data.big_url.indexOf('/upload')).replace('_n', '')
    }
    if (data.source_url) {
      removeFileFlag(data.source_url)
      data.source_url = data.source_url.substr(data.source_url.indexOf('/upload')).replace('_n', '')
    }

    await sequelize.transaction(t => {
      return (async ()=>{
        
        // 判断id是否相同 如果不相同两个都要更新
        if (data.album_id && oldMusic.album_id !== data.album_id) {
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
        }, {transaction: t})
      })()
    })

    const music = await Music.findOne({
      where: {
        id: id
      }
    })

    ctx.body = {
      code:20000,
      message:'修改成功',
      data: music
    }
  }

  // 删除
  static async delete(ctx, next) {
    const id = ctx.params.id
    await Music.update({
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

  // 恢复
  static async recover(ctx, next) {
    const id = ctx.params.id
    await Music.update({
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