// 数据库连接
const { Sequelize,sequelize,force} = require('../../utils/dbConnect')
const { dizhi, tiangan }  = require('../../configs/meta')
const Model = Sequelize.Model

class GanZhi extends Model {

}

GanZhi.init({
  name: { 
    type: Sequelize.STRING(10),
    allowNull: false,
    comment: '名称'
  },
  tiangan_id:{
    type: Sequelize.INTEGER,
    allowNull:false,
    comment:'天干id'
  },
  dizhi_id:{
    type: Sequelize.INTEGER,
    allowNull:false,
    comment:'地支id'
  },
  is_yang: {
    type: Sequelize.INTEGER,
    allowNull:false,
    comment: '是否属阳'
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
  modelName:'ganzhi',
  createdAt:false,
  updatedAt:false
})

// 创建
GanZhi.sync({ force: force }).then(result => {
  (async ()=>{
    const count = await GanZhi.count()
    if(count <= 0){
      let data = []
      for(let i = 0;i < 60;i++){
        const tianganIndex = i%10;
        const dizhiIndex = i%12;
        const tianganItem =  tiangan[tianganIndex];
        const dizhiItem = dizhi[dizhiIndex];
        data.push({
          name:tianganItem.name + dizhiItem.name,
          pinyin:tianganItem.pinyin + dizhiItem.pinyin,
          tiangan_id:tianganIndex+1,
          dizhi_id:dizhiIndex+1,
          is_yang:tianganItem.is_yang,
        })
      }
      await GanZhi.bulkCreate(data)
    }
  })()
})

module.exports = {GanZhi,Sequelize,sequelize}