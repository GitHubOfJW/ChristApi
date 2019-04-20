const router = require('koa-router')()

const controller =  require('../controllers/MemberController')

router.prefix('/member')

router.post('/login', controller.login)
router.get('/info', controller.info)

module.exports = router
