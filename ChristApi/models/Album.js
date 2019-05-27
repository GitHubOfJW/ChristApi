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
    descr:{
      type: Sequelize.STRING(100),
      comment: '描述'
    },
    music_count: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      comment: '专辑内音乐数'
    },
    tumb_url: {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: '缩略图'
    },
    big_url:{
      type: Sequelize.STRING(1000),
      allowNull: true,
      comment: '大图'
    },
    is_show:{
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      comment: '是否显示'
    },
    is_delete:{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      comment: '是否删除'
    }
    
},{
  sequelize,
  modelName:'album',
  engine:'Innodb'
})

// 创建
Album.sync({ force: force })

module.exports = {Album,Sequelize,sequelize}