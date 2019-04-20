const router = require('koa-router')()

const Index = require('../controllers/IndexController')

// 默认
router.get('/', Index.index)


module.exports = router
