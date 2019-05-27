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
      comment: '歌曲名称'
    },
    author:{
      type: Sequelize.STRING(10),
      allowNull: true,
      comment: '作者'
    },
    descr:{
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: '描述'
    },
    tumb_url: {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: '缩略图'
    },
    big_url:{
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: '大图'
    },
    source_url: {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: '资源地址'
    },
    album_id: {
      type: Sequelize.INTEGER,
      comment: '所属专辑'
    },
    time: {
      type: Sequelize.DOUBLE,
      defaultValue: 0,
      comment: '时间毫秒值'
    },
    play_count: {
      type: Sequelize.BIGINT,
      defaultValue: 0,
      comment: '播放量'
    },
    support_count: {
      type: Sequelize.BIGINT,
      defaultValue: 0,
      comment: '收藏量'
    },
    num: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      comment: '序号'
    },
    lrc: {
      type: Sequelize.TEXT,
      comment: '歌词',
    },
    has_lrc: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      comment: '有没有歌词'
    },
    lrc_edit: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      comment: 'lrc需要编辑'
    },
    is_delete:{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      comment: '是否删除'
    }
},{
  sequelize,
  modelName:'music',
  engine:'Innodb'
})

// 创建
Music.sync({ force: force })

module.exports = {Music, Sequelize, sequelize}