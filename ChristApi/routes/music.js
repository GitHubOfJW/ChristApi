const router = require('koa-router')()

const controller =  require('../controllers/MusicController')

router.prefix('/music')
 
router.get('/list', controller.list)
router.post('/add', controller.create)
router.put('/edit/:id', controller.update)

router.get('/mini/list',controller.minilist)
router.get('/mini/favorites',controller.miniFavoriteList)
router.get('/mini/next',controller.nextMusic)
router.get('/mini/prev',controller.prevMusic)
router.get('/mini/:id',controller.getById)
router.put('/mini/edit/:id', controller.update)
router.delete('/delete/:id', controller.delete)
router.put('/recover/:id', controller.recover)

module.exports = router
