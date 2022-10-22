
const MypagesRepository = require("../repositories/mypages.repository")

const dom = function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class MypagesService {
  mypagesRepository = new MypagesRepository();

  editPersonalData = async(nickname, password, confirm, email, address, userId) => {
    if (password !== confirm) {
      return '패스워드와 패스워드 확인란이 달라요';
    }
    await this.mypagesRepository.editPersonalData(nickname, password, email, address, userId);
    return '개인정보 변경이 완료되었습니다';
  };
  
    findAllMypage = async (userId) => {

      const allmypages = await this.mypagesRepository.findAllMypage(userId);
      console.log(allmypages)
        return {
          userId: allmypages.userId,
          point: allmypages.point,
          id : allmypages.id,
          nickname: allmypages.nickname,
          email: allmypages.email,
          address: allmypages.address,
          createdAt: allmypages.createdAt
        }

    }
    
    getMain = async (userId) => {

      const allmypages = await this.mypagesRepository.getMain(userId);
      console.log(allmypages)
        return {
          point: allmypages.point,
          nickname: allmypages.nickname
        }

    }

    getRandoms = async () => {

      const allrandom = await this.mypagesRepository.getRandoms();

      allrandom.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })

      return allrandom.map(random => {
        return {
          userId: random.userId,
          goodsId: random.goodsId,
          createdAt: random.createdAt
        }
      });

    }
  
    createRandoms = async (userId) => {

      const createRandomData = await this.mypagesRepository.createRandoms(userId);
      // moneyPoint -= 5000;
      // await this.mypagesRepository.deductionPoints(moneyPoint);
      const randomGoodsId = dom (1, 5)
      goodsId = randomGoodsId;
      // await this.mypagesRepository.findGoods(userId);

      // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
      return {
        randomGoodsId: randomGoodsId,
        userId: createRandomData.userId,
        goodsId: createRandomData.goodsId,
        createdAt: createRandomData.createdAt,
        updatedAt: createRandomData.updatedAt
      };
    }

    deleteMypages = async (userId,goodsId) => {
      await this.mypagesRepository.deleteMypages(goodsId);
      const deleteMypagesData = await this.mypagesRepository.MypagesById(userId,goodsId);

      return deleteMypagesData;
      
    }

    putPointMypages = async (userId) => {
      const updatePost = await this.mypagesRepository.putPointMypages(userId);

      // const updatePost = await this.mypagesRepository.findMypageById(userId);
      return ;
    };
  
    getPointMypages = async (userId) => {
      const findPointMypages = await this.mypagesRepository.findPointById(userId);

      return findPointMypages;
    };

  }
  
  module.exports = MypagesService;