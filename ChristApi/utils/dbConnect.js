
const Sequelize = require('sequelize')

const { dbConfig } =  require('../config')

const sequelize = new Sequelize(dbConfig.dbName,dbConfig.username,dbConfig.password,{
  host:dbConfig.host,
  port:dbConfig.port,
  dialect:dbConfig.dialect,
  pool:dbConfig.pool
})


// sequelize.authenticate().then(() => {
//     console.log('数据库连接成功');
//   }).catch(err => {
//     console.error('未能连接到数据库', err);
//   });



module.exports = {
  Sequelize,
  sequelize,
  force:false,
}