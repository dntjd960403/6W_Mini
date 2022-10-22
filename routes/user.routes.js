const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/user.controllers');
const userController = new UserController();
const authmiddleware = require('../middlewares/auth-middlewares');

Router.post('/signup', userController.signup);
Router.post('/login', userController.login);
Router.put('/login/password', authmiddleware, userController.changePassword);
Router.put('/admin', userController.getAdmin);

module.exports = Router;
