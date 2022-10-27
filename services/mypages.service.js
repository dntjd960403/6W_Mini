const MypagesRepository = require('../repositories/mypages.repository');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const dom = function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

class MypagesService {
    mypagesRepository = new MypagesRepository();
    //마이페이지 개인정보수정
    editPersonalData = async (nickname, password, confirm, email, address, userId) => {
        if (password !== confirm) {
            return '패스워드와 패스워드 확인란이 달라요';
        }
        const salt = await bcrypt.genSalt(10);
        const encryptedPW = bcrypt.hashSync(password, salt);
        password = encryptedPW;
        await this.mypagesRepository.editPersonalData(nickname, password, email, address, userId);
        return '개인정보 변경이 완료되었습니다';
    };
    //마이페이지 내 정보
    findAllMypage = async (userId, id) => {
      try {
        const allmypages = await this.mypagesRepository.findAllMypage(userId, id);
            return {
                userId: allmypages.userId,
                point: allmypages.point,
                id: allmypages.id,
                nickname: allmypages.nickname,
                email: allmypages.email,
                address: allmypages.address,
                createdAt: allmypages.createdAt,
            }
        } catch (error) {
            throw new Error ("findAllMypage에서 권한이 없습니다")
        }
    };

    //메인페이지에 보일 자신의 닉네임,포인트
    /**
     * 주석 테스트
     * @param {} userId
     * @returns
     */
    getMain = async (userId) => {
      try {
        const allmypages = await this.mypagesRepository.getMain(userId);
        return {
            userId: allmypages.userId,
            point: allmypages.point,
            nickname: allmypages.nickname,
            createdAt: allmypages.createdAt,
        };
      } catch (error) {
        throw new Error ("getMain에서 권한이 없습니다")
      }
    };
    //마이페이지내에 자신이 구입한 상품
    getRandoms = async (userId, goodsId) => {
      try{
        const randoms = await this.mypagesRepository.getRandoms(userId, goodsId);

        randoms.sort((a, b) => 
            b.boxId - a.boxId
          )
      
          return randoms;
      } catch (error) {
        throw new Error ("getRandoms에서 권한이 없습니다")
      }
    }

    // 유저 박스에 상품 생성
    createRandoms = async (userId) => {
        //포인트 차감 포인트 모자를 시 벨리데이션으로 에러 보내기
        const getMain = await this.getMain(userId);
        if (getMain['point'] < 5000) {
            throw {code: -2};
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
    //마이페이지 내에 상품 버리기
    deleteGoods = async (boxId) => {
        const goods = await this.mypagesRepository.deleteGoods(boxId);

        return goods;
    }

    //id로 관리자 여부 조회
    checkAdmin = async (id) => {
        const checkAdminResult = await this.mypagesRepository.findUserByUserId(id);
        console.log("checkAdminResult", checkAdminResult)
        if (checkAdminResult === null) {
            return ("관리자 확인됨");
        } else {
            throw new Error("권한 없음");
        }
    }

    //포인트 적립(관리자 권한 필요)
    plusPoint = async (point, userId) => {
        const plusPointResult = await this.mypagesRepository.plusPoint(point, userId);
        if (plusPointResult[0][1])
        {
            return;
        } else {
            throw new Error("없는 유저");
        }
    };
}

module.exports = MypagesService;
