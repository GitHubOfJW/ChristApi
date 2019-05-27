// 数据库连接
const { Sequelize,sequelize,force} = require('../utils/dbConnect')

const Model = Sequelize.Model

class User extends Model {

}
// 用户表
User.init({
    id:{
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      comment: '主键'
    },
    openid:{
      type: Sequelize.STRING(40),
      comment: '小程序标识'
    },
    session_key:{
      type: Sequelize.STRING(40),
      comment: '密钥'
    },
    unionid:{
      type: Sequelize.STRING(40),
      comment: '公众平台统一用户标识'
    },
    mobile:{
      type: Sequelize.STRING(11),
      comment: '手机号'
    },
    avatarUrl: {
      type: Sequelize.STRING,
      comment: '头像'
    },
    city: {
      type: Sequelize.STRING(50),
      comment: '城市'
    },
    province: {
      type: Sequelize.STRING(50),
      comment: '省份'
    },
    country: {
      type: Sequelize.STRING(50),
      comment: '国家'
    },
    name:{
      type: Sequelize.STRING(100),
      comment: '姓名'
    },
    nickName: {
      type: Sequelize.STRING(50),
      comment: '昵称'
    },
    gender: {
      type: Sequelize.TINYINT,
      comment: '性别'
    },
    language: {
      type: Sequelize.STRING(30),
      comment: '语言'
    },
    birth: {
      type: Sequelize.BIGINT,
      comment:'生日'
    },
    wechat: {
      type: Sequelize.STRING(50),
      allowNull:true,
      comment: '微信'
    },
    qq: {
      type: Sequelize.STRING(20),
      allowNull:true,
      comment: 'qq'
    },
    edit_lrc: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      comment: '编辑权限'
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      comment: '是否删除'
    }
},{
  sequelize,
  modelName:'user',
  engine:'Innodb'
})

// 创建
User.sync({ force: force })

module.exports = {User, Sequelize, sequelize}