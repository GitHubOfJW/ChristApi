const router = require('koa-router')()

const controller =  require('../controllers/MusicController')

router.prefix('/music')
 
router.get('/list', controller.list)
router.post('/add', controller.create)
router.put('/edit/:id', controller.update)

module.exports = router
