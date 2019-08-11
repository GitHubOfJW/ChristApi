const { Member, Sequelize } = require('../models/Member')
const { RoleRuleRel } = require('../models/permission/RoleRuleRel')
const { Rule } = require('../models/permission/Rule')
const path =  require('path')
const { Album }  = require('../models/Album')
const { Music } = require('../models/Music')
const { miniTopMenu } = require('../configs/meta')
const { appInfo, appInfo1} = require('../config')
const uuidv4 = require('uuid/v4')
const fs = require('fs')
module.exports = class IndexController {

  // 检查权限
  static async checkAuth(ctx, next){
    // 获取当前账号
    const member = await Member.findOne({
      where: {
        id: ctx.session.id
      }
    })
    // 如果是超级管理员，直接返回可以
    if (member.is_admin) {
      ctx.body = {
        code: 20000,
        message: '成功',
        data: {
          auth: true
        }
      }
      return
    }
    // 具体判断
    const queryIndex = ctx.url.indexOf('?')
    const path = ctx.url.substring(0, queryIndex >= 0 ? queryIndex -1 : ctx.url.length - 1)
    // 查询有没有这个规则
    const rule = await Rule.findOne({
      where: {
        path: path
      }
    })
    // 如果没有
    if (!rule) {
      ctx.body = {
        code: 20000,
        message: '成功',
        data: {
          auth: true
        }
      }
      return
    }

    // 如果有规则
    const rel = await RoleRuleRel.findOne({
      where: {
        rule_id: rule.id,
        role_id: member.role_id,
        is_delete: false
      }
    })

    ctx.body = {
      code: 20000,
      message: '成功',
      data: {
        auth: !!rel
      }
    }
  }
 
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
        menus: miniTopMenu
      }
    }
  }

  // 初始化项目
  static async initMusic(ctx, next){
    // 专辑编号
    const album_id = ctx.params.id
    // 新编赞美诗
    const data = []
    if (album_id == 2) {
       for(let i = 1 ; i <= 1224; i++) {
         const subDirBegin = '0'.repeat(4 - `${parseInt((i+50)/50)*50-49}`.length) + (parseInt((i+50)/50)*50 - 49)
         let subDirEnd = '0'.repeat(4 - `${parseInt((i+50)/50)*50}`.length) + (parseInt((i+50)/50)*50)
         const temp = parseInt(1224/50)*50
         if(i>= temp) {
            subDirEnd = '0'.repeat(4 - `${1224}`.length) + 1224
         }
         const file = '0'.repeat(4 - `${i}`.length) + i
         data.push({
           name:`歌曲${i}`,
           num: i,
           author: '未知',
           album_id:2,
           source_url: `/upload/2019070120/${subDirBegin}-${subDirEnd}/${file}.mp3`
         })
       }
       await Music.bulkCreate(data)
    }
    ctx.body = {
      'mess':data
    }
  }

  static async miniAccToken (ctx, next) {
    //?grant_type=client_credential&appid=' + appInfo.appid + '&secret=' + appInfo.secret
    const data = await ctx.get('https://api.weixin.qq.com/cgi-bin/token',{
      'grant_type':'client_credential',
      'appid': appInfo.appid,
      'secret': appInfo.secret
    })
    ctx.body = {
      code: 20000,
      data: data
    }

  }

  static async miniAccToken1 (ctx, next) {
    //?grant_type=client_credential&appid=' + appInfo.appid + '&secret=' + appInfo.secret
    const data = await ctx.get('https://api.weixin.qq.com/cgi-bin/token',{
      'grant_type':'client_credential',
      'appid': appInfo1.appid,
      'secret': appInfo1.secret
    })
    ctx.body = {
      code: 20000,
      data: data
    }

  }

  static async streamFile (ctx, next) {
    const file = ctx.params.file

    // fs.createReadStream(`${__dirname}/../../index.js`);
    ctx.body = {
      code: 20000,
      message: '成功'
    }
  }
}