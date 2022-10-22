const { mypages } = require('../models');
const { Goods, Boxes } = require('../models');
const { Users, sequelize } = require('../models');

class MypagesRepository {
  editPersonalData = async (nickname, password, email, address, userId) => {
    const editedPersonalData = await Users.update(
      { nickname, password, email, address },
      { where: { userId } }
    );
    return editedPersonalData;
  };

  findAllMypage = async (userId) => {
    const mypage = await Users.findOne({ where: { userId } });

    return mypage;
  };

  getMain = async (userId) => {
    const mypage = await Users.findOne({ where: { userId } });

    return mypage;
  };

  createRandoms = async (userId, goodsId) => {
    const createGoods = await Boxes.create({ userId, goodsId });

    return createGoods;
  };

  findGoods = async (goodsId) => {
    const findgoods = await Goods.findOne({ where: { goodsId } });

    return findgoods;
  };

  findAllGoods = async (goodsId) => {
    const findAllgoods = await Goods.findAll({});

    return findAllgoods.length;
  };

  putPointMypages = async (userId) => {
    await Users.decrement({ point: 5000 }, { where: { userId } });

    return;
  };
}

module.exports = MypagesRepository;
