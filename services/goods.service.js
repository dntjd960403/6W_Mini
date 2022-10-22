const GoodsRepository = require('../repositories/goods.repository');

class GoodsService {
  goodsrepository = new GoodsRepository();
  // 모든 상품 조회
  findAllGoods = async () => {
    const findAllGoods = await this.goodsrepository.findAllGoods();
    return findAllGoods;
  };
  // 상품 생성
  createGoods = async (name, imageUrl, goodsDetail) => {
    const createGoods = await this.goodsrepository.createGoods(
      name,
      imageUrl,
      goodsDetail
    );

    return createGoods;
  };
  // 상품 수정
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
  //상품 제거
  deleteGoods = async (goodsId) => {
    const findGoods = await this.goodsrepository.findGoods(goodsId);

    if (!findGoods) throw { code: -1 };
    else await this.goodsrepository.deleteGoods(goodsId);

    return findGoods;
  };
}

module.exports = GoodsService;
