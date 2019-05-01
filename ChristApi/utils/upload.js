const multer = require('koa-multer');
const moment = require('moment')
const path =  require('path')
const fs = require('fs')
const uuidv4 = require('uuid/v4')
//配置
const storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        const dir = path.join(__dirname,`../public/upload/${moment().format('YYYYMMDDHH')}/`)
        if(!fs.existsSync(dir)) {
          fs.mkdirSync(dir)
        }
        cb(null, dir)  //注意路径必须存在
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        const ext = path.extname(file.originalname)
        console.log('后缀',ext)
        // cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
        cb(null,uuidv4() + ext)
    }
})


//加载配置
const upload = multer({ storage: storage })

module.exports =  upload