const router = require('koa-router')()

const controller =  require('../controllers/AuguryController')

router.prefix('/augury')

router.get('/getLuarn', controller.getLunar)
module.exports = router
