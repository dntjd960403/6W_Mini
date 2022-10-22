const { mypages } = require('../models');
const { Goods } = require('../models');
const { Users, sequelize } = require('../models');

class MypagesRepository {

  editPersonalData = async (nickname, password, email, address, userId) => {
    const editedPersonalData = await Users.update(
        {nickname, password, email, address}, {where: { userId }}
    );
    return editedPersonalData;
  }
  
  findAllMypage = async (userId) => {
    const mypage = await Users.findOne({ where: {userId} });

    return mypage;
  }

  getMain = async (userId) => {
    const mypage = await Users.findOne({ where: {userId} });

    return mypage;
  }

  getRandoms = async (userId) => {
    const random = await mypages.findAll({userId})

    return random;
  }
  
   MypagesById = async (userId,goodsId) => {
    const mypage = await mypages.findByPk(userId,goodsId);

    return mypage;

  }

  createRandoms = async (userId,randomGoodsId) => {

    const createMypagesData = await Users.create({ 
      userId,  
      randomGoodsId, // 1~5 숫자 들어올거임
   });

    return createMypagesData;
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

  // findMypageById = async (userId) => {
  //   const point = await mypages.findByPk(userId);

  //   return point;
  // };

  putPointMypages = async (userId) => {

    await Users.decrement({ point: 5000 }, { where: { userId } });

    return;
  };

  findPointById = async (userId) => {
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM mypages JOIN Users ON Users.userId = mypages.userId"
    );
    const pointMypage = [];
    results.map((point) => {
      point.userId === userId
        ? pointMypage.push({
            userId: point.userId,
            id: point.id,
            nickname: point.nickname,
            createdAt: point.createdAt,
            updatedAt: point.updatedAt,
            point: point.point,
          })
        : false;
    });     
    let pointList = pointList.sort((a, b) => b.point - a.point);
    return pointList;
  };

}
  


module.exports = MypagesRepository;
