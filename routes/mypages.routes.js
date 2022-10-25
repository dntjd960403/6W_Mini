const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middlewares');

const MypagesController = require('../controllers/mypages.controller');
const mypagesController = new MypagesController();

router.get('/:userId', authMiddleware, mypagesController.getMypages);
router.delete('/:boxId', authMiddleware, mypagesController.deleteGoods);
router.get('/goods/:userId', authMiddleware, mypagesController.getRandoms);
router.get('/main/:userId', authMiddleware, mypagesController.getMain);
router.post('/', authMiddleware, mypagesController.createRandoms);
router.put('/:userId/edit', authMiddleware, mypagesController.editPersonalData);
router.put('/point', authMiddleware, mypagesController.putPointMypages);
router.put('/plusPoint', authMiddleware, mypagesController.plusPoint);

module.exports = router;
