const GoodsService = require('../services/goods.service');

class GoodsController {
    goodsService = new GoodsService();
    // 상품 목록 보기
    getGoods = async (req, res, next) => {
        try {
            const goods = await this.goodsService.findAllGoods();
            res.status(200).json({message: goods});
        } catch (err) {
            const errormessage = `${req.method} ${req.originalUrl} : ${err.errormessage}`;
            console.log(errormessage);
            res.status(400).json({errormessage});
        }
    };
    // 상품 생성
    createGoods = async (req, res, next) => {
        try {
            const {name, imageUrl, goodsDetail} = req.body;

            if (!name) {
                res.status(412).json({errorMessage: '이름 입력 안했누'});
                return;
            }
            if (!imageUrl) {
                res.status(412).json({errorMessage: '이미지 입력 안했누'});
                return;
            }
            if (!goodsDetail) {
                res.status(412).json({errorMessage: '설명 입력 안했누'});
                return;
            }

            const createGoods = await this.goodsService.createGoods(name, imageUrl, goodsDetail);

            res.status(201).json({message: '상품 등록 완료링~', createGoods});
        } catch (err) {
            if (err.code === -1) {
                res.status(401).send({errorMessage: '없는 상품이요!'});
            }
            const errormessage = `${req.method} ${req.originalUrl} : ${err.errormessage}`;
            console.log(errormessage);
            res.status(400).json({errormessage});
        }
    };
    // 상품 수정
    updateGoods = async (req, res, next) => {
        try {
            const {name, imageUrl, goodsDetail} = req.body;
            const {goodsId} = req.params;

            const updateGoods = await this.goodsService.updateGoods(goodsId, name, imageUrl, goodsDetail);

            res.status(200).json({message: '상품 수정 내역이유~', updateGoods});
        } catch (err) {
            if (err.code === -1) {
                res.status(401).send({errorMessage: '없는 상품이요!'});
            } else {
                const errormessage = `${req.method} ${req.originalUrl} : ${err.errormessage}`;
                console.log(errormessage);
                res.status(400).json({errormessage});
            }
        }
    };
    // 상품 삭제
    deleteGoods = async (req, res, next) => {
        try {
            const {goodsId} = req.params;

            const deleteGoods = await this.goodsService.deleteGoods(goodsId);

            res.status(200).json({message: '삭제한 상품이유~', deleteGoods});
        } catch (err) {
            if (err.code === -1) {
                res.status(401).send({errorMessage: '없는 상품이요!'});
            } else {
                const errormessage = `${req.method} ${req.originalUrl} : ${err.errormessage}`;
                console.log(message);
                res.status(400).json({errormessage});
            }
        }
    };
}

//깃 확인
module.exports = GoodsController;
