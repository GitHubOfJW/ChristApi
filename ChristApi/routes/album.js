const router = require('koa-router')()

const controller =  require('../controllers/AlbumController')

router.prefix('/album')
 
router.get('/list', controller.list)
router.post('/add', controller.create)
router.put('/edit/:id', controller.update)

module.exports = router
