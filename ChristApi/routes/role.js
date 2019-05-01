const router = require('koa-router')()

const controller =  require('../controllers/RoleController')

router.prefix('/role')

router.get('/routes', controller.routes)
router.get('/list', controller.list)
router.post('/add', controller.create)
router.put('/edit/:id', controller.update)
router.get('/roles', controller.getRoles)

module.exports = router
