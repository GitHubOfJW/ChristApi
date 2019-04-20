// 数据库连接
const { Sequelize,sequelize,force} = require('../utils/dbConnect')

const Model = Sequelize.Model

class Music extends Model {

}

// 歌曲
Music.init({
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
    author:{
      type: Sequelize.STRING(10),
      comment: '作者'
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
  modelName:'music',
  engine:'Innodb'
})

// 创建
Music.sync({ force: force })

module.exports = {Music, Sequelize}