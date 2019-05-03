const router = require('koa-router')()
const upload =  require('../utils/upload')
const Index = require('../controllers/IndexController')

// 上传图片
router.post('/upload/image', upload.single('file'), Index.upload)
router.post('/upload/music', upload.single('file'), Index.upload)

// 小程序首页
router.get('/mini/index', Index.miniIndex)
module.exports = router