// 数据库连接
const { Sequelize,sequelize,force} = require('../utils/dbConnect')

const Model = Sequelize.Model

class Role extends Model {

}

// 专辑
Role.init({
    id:{
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      comment: '主键'
    },
    name:{
      type: Sequelize.STRING(50),
      comment: '角色名称'
    },
    role_key: {
      type: Sequelize.STRING(50),
      comment: '角色key'
    },
    desc:{
      type: Sequelize.STRING(100),
      comment: '描述'
    },
    routes: {
      type: Sequelize.TEXT,
      comment: '路由配置json'
    },
    is_delete:{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      comment: '是否删除'
    }
    
},{
  sequelize,
  modelName:'role',
  engine:'Innodb'
})

// 创建
Role.sync({ force: force })

module.exports = {Role,Sequelize}