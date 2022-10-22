const GoodsRepository = require('../repositories/goods.repository');

class GoodsService {
  goodsrepository = new GoodsRepository();

  findAllGoods = async () => {
    const findAllGoods = await this.goodsrepository.findAllGoods();
    return findAllGoods;
  };

  createGoods = async (name, imageUrl, goodsDetail) => {
    const createGoods = await this.goodsrepository.createGoods(
      name,
      imageUrl,
      goodsDetail
    );

    return createGoods;
  };

  updateGoods = async (goodsId, name, imageUrl, goodsDetail) => {
    const findGoods = await this.goodsrepository.findGoods(goodsId);
    if (!findGoods) throw { code: -1 };
    const updateGoods = await this.goodsrepository.updateGoods(
      goodsId,
      name,
      imageUrl,
      goodsDetail
    );

    const updatedGoods = await this.goodsrepository.findGoods(goodsId);

    return updatedGoods;
  };

  deleteGoods = async (goodsId) => {
    const findGoods = await this.goodsrepository.findGoods(goodsId);

    if (!findGoods) throw { code: -1 };
    else await this.goodsrepository.deleteGoods(goodsId);

    return findGoods;
  };
}

module.exports = GoodsService;
