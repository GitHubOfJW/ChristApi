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
    mobile:{
      type: Sequelize.STRING(11),
      comment: '手机号'
    },
    name:{
      type: Sequelize.STRING(100),
      comment:'姓名'
    },
    gender: {
      type: Sequelize.BOOLEAN,
      comment: '性别'
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

module.exports = {User, Sequelize}