const router = require('koa-router')()
const controller =  require('../controllers/FavoriteController')

router.prefix('/favorite')
router.post('/mini/favorite', controller.favorite)

module.exports = router
