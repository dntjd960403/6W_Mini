const { Goods } = require('../models');

class GoodsRepository {
  findAllGoods = async () => {
    const findAllGoods = await Goods.findAll({ where: {} });
    console.log(findAllGoods);
    return findAllGoods;
  };

  findGoods = async (goodsId) => {
    const findGoods = await Goods.findOne({ where: { goodsId } });
    return findGoods;
  };

  createGoods = async (name, imageUrl, goodsDetail) => {
    const createGoods = await Goods.create({ name, imageUrl, goodsDetail });

    return {
      goodsId: createGoods.null,
      name: createGoods.name,
      imageUrl: createGoods.imageUrl,
    };
  };

  updateGoods = async (goodsId, name, imageUrl, goodsDetail) => {
    const updateGoods = await Goods.update(
      { name, imageUrl, goodsDetail },
      { where: { goodsId } }
    );

    return updateGoods;
  };

  deleteGoods = async (goodsId) => {
    const deleteGoods = await Goods.destroy({
      where: { goodsId },
    });

    return deleteGoods;
  };
}

module.exports = GoodsRepository;
