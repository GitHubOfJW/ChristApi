// moment
const moment = require('moment')
const validator = require('validator')
const {DiZhi,Sequelize} = require('../models/augury/DiZhi')
const {TianGan} = require('../models/augury/TianGan')
const {GanZhi} = require('../models/augury/GanZhi')
 
const {
    Solar,
    Lunar
  } =  require('../utils/auguryUtil')
 
class AuguryController {
  
  //列表请求
  static async getLunar(ctx,next){
    // 判断日期是否存在
    let { date } = ctx.query
    if(validator.isEmpty(date)){
      req.body = {
        code: 50000,
        message: '缺少date参数'
      }
      return
    }
    
    // 日期转换
    date =  moment(date).toDate()
    const solar = new  Solar(date)
    //  返回json
    ctx.body = {
      code: 20000,
      data: solar,
      message:'获取成功'
    }
  }
 
}

module.exports = AuguryController