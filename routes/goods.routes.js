const express = require('express');
const router = express.Router();
const GoodsController = require('../controllers/goods.controller');
const authAdminMiddleware = require('../middlewares/auth-adminMiddleware');
const goodsController = new GoodsController();

router.get('/', authAdminMiddleware, goodsController.getGoods);
router.post('/', authAdminMiddleware, goodsController.createGoods);
router.put('/:goodsId', authAdminMiddleware, goodsController.updateGoods);
router.delete('/:goodsId', authAdminMiddleware, goodsController.deleteGoods);

module.exports = router;
