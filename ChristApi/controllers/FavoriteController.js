const {Favorite, Sequelize}  = require('../models/Favorite')
const { Music } = require('../models/Music')

module.exports =  class FavriteController {

  // toggle
  static async favorite(ctx, next){
    // 收藏功能
    const { music_id, openid, status = true } = ctx.request.body     
    const favorite = await Favorite.findOne({
      where: {
        music_id: music_id,
        open_id: openid
      }
    })

    // 如果查询到了
    if (favorite){
      await Favorite.update({
        is_delete: !status
      },{
        where:{
          music_id: music_id,
          open_id: openid
        }
      })
    }else{
      await Favorite.create({
        music_id: music_id,
        open_id: openid,
        is_delete: !status
      })
    }

    const count = await Favorite.count({
      where: {
        music_id: music_id,
        is_delete: false
      }
    })

    // 累计
    await Music.update({
      support_count : count
    }, {
      where: {
        id: music_id
      }
    })

    ctx.body = {
      code: 20000,
      message: '成功',
      data: {
        favorite: status
      }
    }
  }
}