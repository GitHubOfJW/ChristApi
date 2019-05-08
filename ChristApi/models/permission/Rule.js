// 数据库连接
const { Sequelize,sequelize,force} = require('../../utils/dbConnect')

const Model = Sequelize.Model

class Rule extends Model {

}

// 规则
Rule.init({
    id:{
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      comment: '主键'
    },
    name:{
      type: Sequelize.STRING(50),
      comment: '规则名称'
    },
    descr:{
      type: Sequelize.STRING(100),
      comment: '描述'
    },
    path: {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: '规则'
    },
    parent_id: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      comment:'分类父id'
    },
    sort: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      comment: '排序'
    },
    is_delete:{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      comment: '是否删除'
    }
},{
  sequelize,
  modelName:'rule',
  engine:'Innodb'
})

// 创建
Rule.sync({ force: force })

module.exports = {Rule,Sequelize,sequelize}