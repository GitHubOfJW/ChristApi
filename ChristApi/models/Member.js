// 数据库连接
const { Sequelize,sequelize,force} = require('../utils/dbConnect')
const uuidv4 = require('uuid/v4')
const md5 =  require('md5')
const Model = Sequelize.Model

class Member extends Model {

}

// 管理员表
Member.init({
    id:{
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      comment: '主键'
    },
    mobile:{
      type: Sequelize.STRING(11),
      comment: '手机号'
    },
    password:{
      type: Sequelize.STRING(40),
      comment: '密码'
    },
    name:{
      type: Sequelize.STRING(20),
      comment:'姓名'
    },
    avatar:{
      type: Sequelize.STRING(100),
      allowNull:true,
      comment:'头像'
    },
    gender: {
      type: Sequelize.BOOLEAN,
      comment: '性别'
    },
    birth: {
      type: Sequelize.DATE,
      allowNull:true,
      comment:'生日'
    },
    wechat: {
      type: Sequelize.STRING(50),
      allowNull:true,
      comment:'微信'
    },
    qq: {
      type: Sequelize.STRING(20),
      allowNull:true,
      comment:'qq'
    },
    token: {
      type: Sequelize.STRING(41),
      comment:'token'
    },
    role_id:{
      type: Sequelize.INTEGER,
      allowNull:true,
      comment:'角色'
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      comment:'是否是管理员'
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      comment:'是否删除'
    }
},{
  sequelize,
  modelName:'member',
  engine:'Innodb'
})

// 创建
Member.sync({ force: force }).then(result=>{
    Member.create({
      mobile:'13311255165',
      name:'朱建伟',
      password: md5(md5('zhujianwei')),
      gender:true,
      birth:Date.now(),
      wechat:'zhujianwei9823',
      is_admin:true,
      qq:'1284627282',
      avatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      token:uuidv4()
    })
})

module.exports = {Member, Sequelize}