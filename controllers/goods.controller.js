const GoodsService = require('../services/goods.service');

class GoodsController {
  goodsService = new GoodsService();

  getGoods = async (req, res, next) => {
    try {
      const goods = await this.goodsService.findAllGoods();
      res.status(200).json({ message: goods });
    } catch (err) {
      const message = `${req.method} ${req.originalUrl} : ${err.message}`;
      console.log(message);
      res.status(400).json({ message });
    }
  };

  createGoods = async (req, res, next) => {
    try {
      const { name, imageUrl, goodsDetail } = req.body;

      const createGoods = await this.goodsService.createGoods(
        name,
        imageUrl,
        goodsDetail
      );

      res.status(201).json({ message: '상품 등록 완료링~', createGoods });
    } catch (err) {
      if (err.code === -1) {
        res.status(401).send({ errorMessage: '없는 상품이요!' });
      }
      const message = `${req.method} ${req.originalUrl} : ${err.message}`;
      console.log(message);
      res.status(400).json({ message });
    }
  };

  updateGoods = async (req, res, next) => {
    try {
      const { name, imageUrl, goodsDetail } = req.body;
      const { goodsId } = req.params;

      const updateGoods = await this.goodsService.updateGoods(
        goodsId,
        name,
        imageUrl,
        goodsDetail
      );

      res.status(200).json({ message: '상품 수정 내역이유~', updateGoods });
    } catch (err) {
      if (err.code === -1) {
        res.status(401).send({ errorMessage: '없는 상품이요!' });
      } else {
        const message = `${req.method} ${req.originalUrl} : ${err.message}`;
        console.log(message);
        res.status(400).json({ message });
      }
    }
  };

  deleteGoods = async (req, res, next) => {
    try {
      const { goodsId } = req.params;

      const deleteGoods = await this.goodsService.deleteGoods(goodsId);

      res.status(200).json({ message: '삭제한 상품이유~', deleteGoods });
    } catch (err) {
      if (err.code === -1) {
        res.status(401).send({ errorMessage: '없는 상품이요!' });
      } else {
        const message = `${req.method} ${req.originalUrl} : ${err.message}`;
        console.log(message);
        res.status(400).json({ message });
      }
    }
  };
}
//깃 확인
module.exports = GoodsController;
