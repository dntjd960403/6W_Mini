const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middlewares');

const MypagesController = require('../controllers/mypages.controller');
const mypagesController = new MypagesController();

router.get('/:userId', authMiddleware, mypagesController.getMypages);
router.get('/goods/:userId', authMiddleware, mypagesController.getRandoms);
router.get('/main/:userId', authMiddleware, mypagesController.getMain);
router.post('/', authMiddleware, mypagesController.createRandoms);
router.delete(
  '/:userId/:goodsId',
  authMiddleware,
  mypagesController.deleteMypages
);
router.get('/point', authMiddleware, mypagesController.getPointMypages);
router.put('/point', authMiddleware, mypagesController.putPointMypages);
router.put('/:userId/edit', authMiddleware, mypagesController.editPersonalData);

module.exports = router;
