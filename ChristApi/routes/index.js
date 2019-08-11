const router = require('koa-router')()
const upload =  require('../utils/upload')
const Index = require('../controllers/IndexController')
const Question = require('../controllers/QuestionController')

// 初始化音乐
// router.get('/init/:id', Index.initMusic)

// 上传图片
router.post('/upload/image', upload.single('file'), Index.upload)
router.post('/upload/music', upload.single('file'), Index.upload)

// 小程序首页
router.get('/mini/index', Index.miniIndex)
// 常见问题
router.get('/mini/questions', Question.list)

router.get('/mini/getAccToken',Index.miniAccToken)
router.get('/mini/getAccToken1',Index.miniAccToken1)
module.exports = router