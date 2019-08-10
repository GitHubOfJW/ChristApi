const router = require('koa-router')()
const controller =  require('../controllers/UserController')

router.prefix('/user')
router.get('/mini/login', controller.minlogin)
router.get('/mini/login1', controller.minlogin1)
router.put('/mini/edit/:id', controller.update)

module.exports = router
