const { Member, Sequelize } = require('../models/Member')
const { RoleRuleRel } = require('../models/permission/RoleRuleRel')
const { Rule } = require('../models/permission/Rule')
const path =  require('path')
const { Album }  = require('../models/Album')
const { Music } = require('../models/Music')
const { miniTopMenu } = require('../config/meta')
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
    if (album_id === 1) {
      // 生成文件目录
      const musics = await Music.findAll({
        where: {
          album_id:album_id
        }
      })
      
      // 遍历改名
      for(let music of musics) {
        const name = uuidv4()
        const source_url = music.source_url.substring(music.source_url.indexOf('/upload'))
        const oldPath = path.join(__dirname,'../public/',source_url)
        const new_source_url = source_url.substring(0,source_url.lastIndexOf('/')+1) + name + source_url.substring(source_url.indexOf('.'))
        const newPath = path.join(__dirname,'../public/',new_source_url)
        fs.renameSync(oldPath,newPath)
        await Music.update({
          source_url:new_source_url
        },{
          where:{
            id: music.id
          }
        })
      }
    }
    ctx.body = {
      'mess':'成啦'
    }
  }
}