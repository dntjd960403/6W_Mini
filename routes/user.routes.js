const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controllers');
const userController = new UserController();
const authmiddleware = require('../middlewares/auth-middlewares');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/login/password', authmiddleware, userController.changePassword);
router.put('/admin', userController.getAdmin);

module.exports = router;
