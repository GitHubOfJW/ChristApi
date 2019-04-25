const router = require('koa-router')()

const controller =  require('../controllers/RuleController')

router.prefix('/rule')

router.get('/cates', controller.ruleCate)
router.get('/list', controller.list)
router.post('/create', controller.create)
router.put('/update', controller.update)

module.exports = router
