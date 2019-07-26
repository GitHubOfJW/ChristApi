// 数据库连接
const { Sequelize,sequelize,force} = require('../utils/dbConnect')

const Model = Sequelize.Model

class Favorite extends Model {

}

// 收藏
Favorite.init({
    id:{
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      comment: '主键'
    },
    music_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: '音乐编号'
    },
    open_id: {
      type: Sequelize.STRING(40),
      allowNull: true,
      comment: ''
    },
    is_delete:{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      comment: '是否删除'
    }
},{
  sequelize,
  modelName:'favorite',
  engine:'Innodb'
})

// 创建
Favorite.sync({ force: force })

module.exports = {Favorite,Sequelize,sequelize}