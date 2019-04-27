const router = require('koa-router')()

const controller =  require('../controllers/MemberController')

router.prefix('/member')

router.post('/login', controller.login)
router.get('/info', controller.info)
router.delete('/logout', controller.logout)
router.get('/list', controller.list)
router.post('/add', controller.create)
router.put('/edit/:id', controller.update)

module.exports = router
