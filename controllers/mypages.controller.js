const MypagesService = require('../services/mypages.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class MypagesController {
  mypagesService = new MypagesService(); // Comments 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getMypages = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const mypages = await this.mypagesService.findAllMypage();

    res.status(200).json({ data: mypages })
  }

  getRandoms = async (req, res, next) => {
    const random = await this.mypagesService.getRandoms();

    res.status(200).json({ data: random })
  }

  createMypages = async (req, res, next) => { 

    const { userId } = req.params;
    const { point,goodsId } = res.locals.user;
 
    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const createMypagesData = await this.mypagesService.createMypages(userId,point,goodsId);

    res.status(201).json({ data: createMypagesData });
  }


    deleteMypages = async (req, res, next) => {
    const {userId, goodsId} = req.params

    const removeMypages = await this.mypagesService.deleteMypages(userId,goodsId);

    res.status(200).json({ data: removeMypages });
    }

    findCommentsId = async (req, res, next) => {

      const {commentsId} = req.params

      const Id = await this.mypagesService.findCommentsId(commentsId);

      res.status(200).send({ comments: Id });

    }
  }



module.exports = MypagesController;