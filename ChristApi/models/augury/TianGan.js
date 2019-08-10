// 数据库连接
const { Sequelize,sequelize,force} = require('../../utils/dbConnect')
const { tiangan }  = require('../../configs/meta')

const Model = Sequelize.Model

class TianGan extends Model {

}

TianGan.init({
  name: { 
    type: Sequelize.STRING(10),
    allowNull: false,
    comment: '名称'
  },
  code: {
    type: Sequelize.INTEGER,
    allowNull:false,
    comment: '编号'
  },
  is_yang: {
    type: Sequelize.INTEGER,
    allowNull:false,
    comment: '是否属阳'
  },
  xiangfa: {
    type: Sequelize.STRING(1000),
    allowNull:true,
    comment:'象法',
  },
  explain: {
    type: Sequelize.TEXT,
    allowNull: true,
    comment: '说明'
  },
  pinyin:{
    type: Sequelize.STRING(20),
    allowNull:false,
    comment:'拼音'
  },
  sort: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue:1,
    comment: '排序'
  },
},{
  sequelize,
  engine: 'Innodb',//如果要createAt 和updateAt 不能用MYISAM
  modelName:'meta_tiangan',
  createdAt:false,
  updatedAt:false
})

// 创建
TianGan.sync({ force: force }).then(result => {
  (async ()=> {
    // 初始化数据
    const count = await TianGan.count()
    if(count <= 0){
      await TianGan.bulkCreate(tiangan)
    }
  })()
})

module.exports = {TianGan,Sequelize,sequelize}