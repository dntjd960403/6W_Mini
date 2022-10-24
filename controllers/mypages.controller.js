const MypagesService = require('../services/mypages.service');

class MypagesController {
  mypagesService = new MypagesService();
  //마이페이지 개인정보수정
  editPersonalData = async (req, res, next) => {
    try {
      const { nickname, password, confirm, email, address } = req.body;
      const { userId } = res.locals.user;
      const editPersonalResult = await this.mypagesService.editPersonalData(
        nickname,
        password,
        confirm,
        email,
        address,
        userId
      );
      res.status(200).json({ message: editPersonalResult });
    } catch (err) {
      res.status(400).json({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
    }
  };

  //마이페이지안에 로그인한 개인정보
  getMypages = async (req, res, next) => {
    const { userId } = req.params;
    const { id } = res.locals.user;
    const mypages = await this.mypagesService.findAllMypage(userId, id);

    res.status(200).json({ data: mypages });
  };
  //메인페이지에 상단에 보일 닉네임,포인트
  getMain = async (req, res, next) => {
    const { userId } = req.params;

    const main = await this.mypagesService.getMain(userId);

    res.status(200).json({ data: main });
  };
  //마이페이지내에 구매한 상품조회
  getRandoms = async (req, res, next) => {
    const { userId } = req.params;

    const random = await this.mypagesService.getRandoms(userId);

    res.status(200).json({ data: random });
  };
  // 유저 박스에 상품 생성
  createRandoms = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;

      const createMypagesData = await this.mypagesService.createRandoms(userId);

      res.status(201).json({ data: createMypagesData });
    } catch (err) {
      if (err.code === -2) {
        res.status(401).json({ errorMessage: '포인트가 모자라다' });
      } else {
        res.status(400).json({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
      }
    }
  };
  // 구입한 상품 버리기
  deleteGoods = async (req, res, next) => {
    
    const { boxId } = req.params;

    await this.mypagesService.deleteGoods(boxId);

    res.status(200).json({ message: '버린거 확인완료링~!' });
    
  };
  // 메인페이지에서 박스누르면 포인트 차감
  putPointMypages = async (req, res, next) => {
    const { userId } = res.locals.user;

    await this.mypagesService.putPointMypages(userId);
    res.status(200).json({ data: '' });
  };

}

module.exports = MypagesController;
