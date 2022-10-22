const express = require('express');
const router = express.Router(); 
const authMiddleware = require("../middlewares/auth-middlewares");

const MypagesController = require("../controllers/mypages.controller")
const mypagesController = new MypagesController();

router.get("/mypage/:userId", authMiddleware, mypagesController.getMypages);
router.post("/mypage", authMiddleware, mypagesController.createMypages);
router.delete("/mypage/:userId/:goodsId", authMiddleware, mypagesController.deleteMypages)



module.exports = router;