const router = require('koa-router')()
const upload =  require('../utils/upload')
const Index = require('../controllers/IndexController')

// 上传图片
router.post('/upload/image', upload.single('file'), Index.upload)
router.post('/upload/music', upload.single('file'), Index.upload)


module.exports = router

