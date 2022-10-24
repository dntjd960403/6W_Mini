const MypagesService = require('../services/mypages.service');

class MypagesController {
  mypagesService = new MypagesService();

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

  getMypages = async (req, res, next) => {
    const { userId } = req.params;

    const mypages = await this.mypagesService.findAllMypage(userId);

    res.status(200).json({ data: mypages });
  };

  getMain = async (req, res, next) => {
    const { userId } = req.params;

    const main = await this.mypagesService.getMain(userId);

    res.status(200).json({ data: main });
  };

  getRandoms = async (req, res, next) => {
    const { userId } = req.params;

    const random = await this.mypagesService.getRandoms(userId);

    res.status(200).json({ data: random });
  };

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
  // abc
  deleteGoods = async (req, res, next) => {
    const { userId,goodsId } = req.params;

    const removeGoods = await this.mypagesService.deleteGoods(userId,goodsId);

    res.status(200).json({ data: removeGoods });
  };

  putPointMypages = async (req, res, next) => {
    const { userId } = res.locals.user;

    await this.mypagesService.putPointMypages(userId);
    res.status(200).json({ data: '포인트 충전이 완료되었습니다.' });
  };

}

module.exports = MypagesController;
