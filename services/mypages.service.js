
const MypagesRepository = require("../repositories/mypages.repository")

const dom = function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class MypagesService {
  mypagesRepository = new MypagesRepository();
  
    findAllMypage = async () => {

      const allmypages = await this.mypagesRepository.findAllMypage(userId);
  
      allmypages.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
  
      return allmypages.map(mypage => {
        return {
          userId: mypage.userId,
          email: mypage.email,
          nickname: mypage.nickname,
          point: mypage.point,
          goodsId: mypage.goodsId,
          createdAt: mypage.createdAt
        }
      });
    }
  
    createMypages = async (userId,point,goodsId) => {

      const createMypagesData = await this.mypagesRepository.createMypages(userId,point,goodsId);
      // moneyPoint -= 5000;
      // await this.mypagesRepository.deductionPoints(moneyPoint);

      const r = dom (1, 5)

      // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
      return {
        r: r,
        pagesId: createMypagesData.null,
        userId: createMypagesData.userId,
        point: createMypagesData.point,
        goodsId: createMypagesData.goodsId,
        createdAt: createMypagesData.createdAt,
        updatedAt: createMypagesData.updatedAt
      };
    }

    deleteMypages = async (userId,goodsId) => {
      await this.mypagesRepository.deleteMypages(goodsId);
      const deleteMypagesData = await this.mypagesRepository.MypagesById(userId,goodsId);

      return deleteMypagesData;
      
    }

  }
  
  module.exports = MypagesService;