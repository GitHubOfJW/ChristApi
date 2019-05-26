const { Member, Sequelize } = require('../models/Member')
const path =  require('path')
const { Album }  = require('../models/Album')

module.exports = class IndexController {
 
  // 上传照片
  static async upload(ctx, next){
    const destination = ctx.req.file.destination
    const path = destination.substring(destination.indexOf('/public')+'/public'.length)
    ctx.body = {
      code: 20000,
      message: '上传成功',
      data: {
        filename:ctx.req.file.filename,
        url: ctx.state.G.url + (path + ctx.req.file.filename).replace('//','/')
      }
    }
  }

  static getTopMenus() {
    const data = [{
      imgSrc: 'http://192.168.2.106:3000/images/qrcode.png',
      title: '扫码分享',
      type: 0,
      content: ''
    },{
      imgSrc: 'http://192.168.2.106:3000/images/awared.png',
      title: '打赏声明',
      type: 1,
      content: ''
    },{
      imgSrc: 'http://192.168.2.106:3000/images/mzsm.png',
      title: '免责声明',
      type: 2,
      content: ''
    }]
    return data
  }

  static async miniIndex(ctx, next) {
    const { page = 1 } = ctx.request.body
    const { page_size = 10 } = ctx.request.body
    // 专辑列表
    const albums = await Album.findAndCountAll({
      offset: (page - 1) * page_size,
      limit: page_size
    })

    // 返回数据
    ctx.body = {
      code: 20000,
      message: "成功",
      data: {
        albums,
        menus: IndexController.getTopMenus()
      }
    }
  }
}