const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/user.controllers');
const userController = new UserController();

Router.post('/signup', userController.signup);
Router.post('/login', userController.login);
Router.put('/login/password', userController.changePassword);
Router.put('/admin', userController.getAdmin);

module.exports = Router;
