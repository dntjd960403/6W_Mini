const express = require('express');
const router = express.Router(); 
const authMiddleware = require("../middlewares/auth-middlewares");

const MypagesController = require("../controllers/mypages.controller")
const mypagesController = new MypagesController();

router.get("/:userId", authMiddleware, mypagesController.getMypages);
router.get("/goods/:userId", authMiddleware, mypagesController.getRandoms)
router.post("/", authMiddleware, mypagesController.createMypages);
router.delete("/:userId/:goodsId", authMiddleware, mypagesController.deleteMypages)



module.exports = router;