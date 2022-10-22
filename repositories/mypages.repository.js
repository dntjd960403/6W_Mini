const { mypages } = require('../models');

class MypagesRepository {
  findAllMypage = async (userId) => {
    const mypage = await mypages.findOne({where: {userId}});

    return mypage;
  }
  
   MypagesById = async (userId,goodsId) => {
    const mypage = await mypages.findByPk(userId,goodsId);

    return mypage;

  }

  createMypages = async (userId,postsId,comment,nickname) => {

    const createCommentsData = await mypages.create({ userId,postsId,comment,nickname });
    return createCommentsData;
  }

  // deductionPoints = async (userId,point) => {
  //   const deductionPointsData = await mypages.({point}, {where: {userId}});
  // }
 

  deleteMypages = async (goodsId) => {
    const deleteCommentsData = await mypages.destroy({ where: {userId,goodsId}});

    return deleteCommentsData;
  }
  
}

module.exports = MypagesRepository;
