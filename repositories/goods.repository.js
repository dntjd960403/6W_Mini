const { Goods } = require('../models');

class GoodsRepository {
  // 모든 상품 조회
  findAllGoods = async () => {
    const findAllGoods = await Goods.findAll({ where: {} });
    console.log(findAllGoods.length);
    return findAllGoods;
  };
  // 상품 1개 조회
  findGoods = async (goodsId) => {
    const findGoods = await Goods.findOne({ where: { goodsId } });
    return findGoods;
  };
  // 상품 생성
  createGoods = async (name, imageUrl, goodsDetail) => {
    const createGoods = await Goods.create({ name, imageUrl, goodsDetail });

    return {
      goodsId: createGoods.null,
      name: createGoods.name,
      imageUrl: createGoods.imageUrl,
      goodsDetail: createGoods.goodsDetail,
    };
  };
  // 상품 수정
  updateGoods = async (goodsId, name, imageUrl, goodsDetail) => {
    const updateGoods = await Goods.update({ name, imageUrl, goodsDetail }, { where: { goodsId } });

    return updateGoods;
  };
  // 상품 제거
  deleteGoods = async (goodsId) => {
    const deleteGoods = await Goods.destroy({
      where: { goodsId },
    });

    return deleteGoods;
  };
}

module.exports = GoodsRepository;
