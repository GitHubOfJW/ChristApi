const router = require('koa-router')()

const controller =  require('../controllers/RuleController')

router.prefix('/rule')

router.get('/cates', controller.ruleCate)
router.get('/list', controller.list)
router.post('/add', controller.create)
router.put('/edit/:id', controller.update)
router.delete('/delete/:id', controller.delete)
router.put('/recover/:id', controller.recover)

module.exports = router
