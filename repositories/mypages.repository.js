const { mypages } = require('../models');
const { Goods } = require('../models');

class MypagesRepository {
  findAllMypage = async (userId) => {
    const mypage = await mypages.findOne({where: {userId}});

    return mypage;
  }

  getRandoms = async (userId) => {
    const random = await mypages.findOne({where: {userId}})

    return random;
  }
  
   MypagesById = async (userId,goodsId) => {
    const mypage = await mypages.findByPk(userId,goodsId);

    return mypage;

  }

  createMypages = async (userId,postsId,comment,nickname, r) => {

    const createCommentsData = await mypages.create({ userId,postsId,comment,nickname,r });

    return createCommentsData;
  }

  // deductionPoints = async (userId,point) => {
  //   const deductionPointsData = await mypages.({point}, {where: {userId}});
  // }
 

  deleteMypages = async (goodsId) => {
    const deleteCommentsData = await mypages.destroy({ where: {userId,goodsId}});

    return deleteCommentsData;
  }

  findGoods = async (goodsId) => {
    const findgood = await Goods.findOne({where: {goodsId}})
  }
  
}

module.exports = MypagesRepository;
