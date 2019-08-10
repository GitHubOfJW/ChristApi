// 数据库连接
const { Sequelize,sequelize,force} = require('../../utils/dbConnect')
const { dizhi }  = require('../../configs/meta')

const Model = Sequelize.Model

class DiZhi extends Model {

}

DiZhi.init({
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
  shengxiao: {
    type: Sequelize.STRING(5),
    allowNull:true,
    comment:'生肖',
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
  modelName:'meta_dizhi',
  createdAt:false,
  updatedAt:false
})

// 创建
DiZhi.sync({ force: force }).then(result => {
  (async ()=> {
    // 初始化数据
    const count = await DiZhi.count()
    if(count <= 0){
      await DiZhi.bulkCreate(dizhi)
    }
  })()
})

module.exports = {DiZhi,Sequelize,sequelize}