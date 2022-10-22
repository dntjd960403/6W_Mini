const express = require('express');
const router = express.Router();
const GoodsController = require('../controllers/goods.controller');
const goodsController = new GoodsController();

router.get('/', goodsController.getGoods);
router.post('/', goodsController.createGoods);
router.put('/:goodsId', goodsController.updateGoods);
router.delete('/:goodsId', goodsController.deleteGoods);

module.exports = router;
