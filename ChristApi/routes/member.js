const router = require('koa-router')()

const controller =  require('../controllers/MemberController')

router.prefix('/member')

router.post('/login', controller.login)
router.get('/info', controller.info)
router.post('/logout', controller.logout)

module.exports = router
