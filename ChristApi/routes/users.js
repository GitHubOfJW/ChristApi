const router = require('koa-router')()
const controller =  require('../controllers/UserController')

router.prefix('/user')
router.get('/mini/login', controller.minlogin)
router.put('/mini/edit/:id', controller.update)

module.exports = router
