// 数据库连接
const { Sequelize,sequelize,force} = require('../utils/dbConnect')

const Model = Sequelize.Model

class Album extends Model {

}

// 专辑
Album.init({
    id:{
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      comment: '主键'
    },
    name:{
      type: Sequelize.STRING(50),
      comment: '专辑名称'
    },
    desc:{
      type: Sequelize.STRING(100),
      comment: '描述'
    },
    tumb_url: {
      type: Sequelize.STRING(100),
      comment: '缩略图'
    },
    big_url:{
      type: Sequelize.STRING(1000),
      comment: '大图'
    },
    is_delete:{
      type: Sequelize.BOOLEAN,
      comment: '是否删除'
    }
    
},{
  sequelize,
  modelName:'album',
  engine:'Innodb'
})

// 创建
Album.sync({ force: force })

module.exports = {Album,Sequelize}