const MypagesService = require('../services/mypages.service');

class MypagesController {
    mypagesService = new MypagesService();
    //마이페이지 개인정보수정
    editPersonalData = async (req, res, next) => {
        try {
            const {nickname, password, confirm, email, address} = req.body;
            const {userId} = res.locals.user;
            const editPersonalResult = await this.mypagesService.editPersonalData(
                nickname,
                password,
                confirm,
                email,
                address,
                userId
            );
            res.status(200).json({message: editPersonalResult});
        } catch (err) {
            res.status(400).json({errorMessage: '요청한 데이터 형식이 올바르지 않습니다.'});
        }
    };

    //마이페이지안에 로그인한 개인정보
    getMypages = async (req, res, next) => {
        try {
            const {userId} = req.params;
            const {id} = res.locals.user;
            const mypages = await this.mypagesService.findAllMypage(userId, id);

            res.status(200).json({data: mypages});
        } catch (error) {
            res.status(400).json({errorMessage: error.message})
        }
    };
    //메인페이지에 상단에 보일 닉네임,포인트
    getMain = async (req, res, next) => {
        try {
            const {userId} = req.params;

            const main = await this.mypagesService.getMain(userId);

            res.status(200).json({data: main});
        } catch (error) {
            res.status(400).json({errorMessage: error.message})
        }
    };
    //마이페이지 내에 구매한 상품조회
    getRandoms = async (req, res, next) => {
        try {
            const {userId} = req.params;

            const random = await this.mypagesService.getRandoms(userId);

            res.status(200).json({data: random});
        } catch (error) {
            res.status(400).json({errorMessage: error.message})
        }
    };
    //유저 박스에 상품 생성
    createRandoms = async (req, res, next) => {
        try {
            const {userId} = res.locals.user;

            const createMypagesData = await this.mypagesService.createRandoms(userId);

            res.status(201).json({data: createMypagesData});
        } catch (err) {
            if (err.code === -2) {
                res.status(401).json({errorMessage: '포인트가 모자라다'});
            } else {
                res.status(400).json({errorMessage: '요청한 데이터 형식이 올바르지 않습니다.'});
            }
        }
    };
    // 구입한 상품 버리기
    deleteGoods = async (req, res, next) => {

        const {boxId} = req.params;

        await this.mypagesService.deleteGoods(boxId);

        res.status(200).json({message: '버린거 확인완료링~!'});
    };
    //id로 관리자 여부 조회
    checkAdmin = async (req, res, next) => {
        try {
            const {id} = res.locals.user;
            await this.mypagesService.checkAdmin(id);
            return ({data: "관리자 O"});
        } catch (error) {
            //res.status(400).json({data: "관리자 X"});
            return ({message: error.message})
        }
    };

    //포인트 적립(관리자 권한 필요)
    plusPoint = async (req, res, next) => {
        const {id} = res.locals.user;
        const {point, userId} = req.body;
        const checkAdmin = await this.mypagesService.checkAdmin(id)
            .catch((error) => {
                res.status(401).json({data: error.message});
            });
        console.log("checkAdmin", checkAdmin);
        try {
            if (checkAdmin === "관리자 확인됨") {
                await this.mypagesService.plusPoint( point, userId);
                res.status(200).json({data: '포인트 충전됨'});
            }
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };
}

module.exports = MypagesController;
