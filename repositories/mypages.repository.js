const { mypages } = require('../models');
const { Goods, Boxes } = require('../models');
const { Users, sequelize } = require('../models');

class MypagesRepository {
  //마이페이지 개인정보수정
  editPersonalData = async (nickname, password, email, address, userId) => {
    const editedPersonalData = await Users.update(
      { nickname, password, email, address },
      { where: { userId } }
    );
    return editedPersonalData;
  };
  //마이페이지에서 내 정보
  findAllMypage = async (userId) => {
    const mypage = await Users.findOne({ where: { userId } });

    return mypage;
  };
  //메인페이지에서 자신의 닉네임,포인트
  getMain = async (userId) => {
    const mypage = await Users.findOne({ where: { userId } });

    return mypage;
  };
  //마이페이지에서 내가 구입한 상품들 조회
  getRandoms = async (userId) => {
    const randoms = await Boxes.findAll({ where: { userId } });
    const randomBox = [];
    for (let i = 0; i < randoms.length; i++) {
      randomBox.push({
        userId: randoms[i].dataValues.userId,
        goodsId: randoms[i].dataValues.goodsId,
      });
    }
    return randomBox;
  };
  // 뽑힌 숫자 상품을 박스에 넣어주기
  createRandoms = async (userId, goodsId) => {
    const createGoods = await Boxes.create({ userId, goodsId });

    return createGoods;
  };
  //전체 상품 갯수를 세서 랜덤으로 숫자 뽑기
  findAllGoods = async (goodsId) => {
    const findAllgoods = await Goods.findAll({});

    return findAllgoods.length;
  };
  //상품구입시 포인트 차감
  putPointMypages = async (userId) => {
    await Users.decrement({ point: 5000 }, { where: { userId } });

    return;
  };
  //마이페이지 내에 상품 버리기
  deleteGoods = async (boxId) => {
    const deleteG = await Boxes.destroy({ where: { boxId } });

    return deleteG;
  };
}

module.exports = MypagesRepository;
