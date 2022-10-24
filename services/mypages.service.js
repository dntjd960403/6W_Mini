const MypagesRepository = require('../repositories/mypages.repository');

const dom = function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class MypagesService {
  mypagesRepository = new MypagesRepository();
  //마이페이지 개인정보수정
  editPersonalData = async(nickname, password, confirm, email, address, userId) => {
    if (password !== confirm) {
      return '패스워드와 패스워드 확인란이 달라요';
    }
    await this.mypagesRepository.editPersonalData(nickname, password, email, address, userId);
    return '개인정보 변경이 완료되었습니다';
  };
  //마이페이지 내 정보
  findAllMypage = async (userId) => {
    const allmypages = await this.mypagesRepository.findAllMypage(userId);
    console.log(allmypages);
    return {
      userId: allmypages.userId,
      point: allmypages.point,
      id: allmypages.id,
      nickname: allmypages.nickname,
      email: allmypages.email,
      address: allmypages.address,
      createdAt: allmypages.createdAt,
    };
  };
  //메인페이지에 보일 자신의 닉네임,포인트
  getMain = async (userId) => {
    const allmypages = await this.mypagesRepository.getMain(userId);
    return {
      userId: allmypages.userId,
      point: allmypages.point,
      nickname: allmypages.nickname,
      createdAt: allmypages.createdAt,
    };
  };
  //마이페이지내에 자신이 구입한 상품
  getRandoms = async (userId,goodsId) => {
    const randoms = await this.mypagesRepository.getRandoms(userId,goodsId);
  
    return randoms;
  }

  // 유저 박스에 상품 생성
  createRandoms = async (userId) => {
    //포인트 차감 포인트 모자를 시 벨리데이션으로 에러 보내기
    const getMain = await this.getMain(userId);
    if (getMain['point'] < 5000) {
      throw { code: -2 };
    }
    const putPointMypages = await this.mypagesRepository.putPointMypages(userId);
    //전체 상품 갯수를 세서 랜덤으로 숫자 뽑기
    const goodsLength = await this.mypagesRepository.findAllGoods();
    const randomNum = dom(1, 100);
    const goodsId = (randomNum % goodsLength) + 1;
    // 뽑힌 숫자 상품을 박스에 넣어주기
    const createItem = await this.mypagesRepository.createRandoms(userId, goodsId);
    return createItem;
  };
  //박스 구입시 포인트 차감
  putPointMypages = async (userId) => {
    const updatePost = await this.mypagesRepository.putPointMypages(userId);

    return;
  };
  //마이페이지 내에 상품 버리기
  deleteGoods = async (boxId) => {
    const goods = await this.mypagesRepository.deleteGoods(boxId);

    return goods;
  }
}

module.exports = MypagesService;
