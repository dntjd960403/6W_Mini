const UserService = require('../services/user.services');
const Joi = require('joi');

const re_id = /^[a-zA-Z0-9]{4,10}$/;
const re_nickname = /^[a-zA-Z0-9]{3,10}$/;
const re_password = /^[a-zA-Z0-9]{4,30}$/;
const re_email =
  /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;

const schema = Joi.object({
  id: Joi.string().pattern(re_id).required(),
  nickname: Joi.string().pattern(re_nickname).required(),
  password: Joi.string().pattern(re_password).required(),
  confirm: Joi.string().required(),
  address: Joi.string().required(),
  email: Joi.string().pattern(re_email).required(),
});

class UserController {
  userService = new UserService();
  signup = async (req, res, next) => {
    try {
      const verifyFormat = await schema.validateAsync(req.body);
      console.log(verifyFormat);
      const registerUser = await this.userService.signup(verifyFormat);
      res.status(200).json({ data: registerUser });
    } catch (error) {
      //console.log(`${error.message}`);
      res.status(412).json({ errorMessage: error.message });
    }
  };

  login = async (req, res, next) => {
    try {
      const { id, password } = req.body;
      const user = await this.userService.login(id, password);
      // console.log(user)
      res.status(200).json({ data: user });
    } catch (error) {
      console.log(`${error.message}`);
      res
        .status(400)
        .send({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const { id, password, confirm, email } = req.body;
      const user = await this.userService.changePassword(
        id,
        password,
        confirm,
        email
      );
      res.status(200).json({ data: user });
    } catch (error) {
      console.log(`${error.message}`);
      res
        .status(400)
        .send({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
    }
  };

  getAdmin = async (req, res, next) => {
    try {
      const { id } = req.body;
      const user = await this.userService.getAdmin(id);

      res.status(200).json({ message: '관리자 임명 완료', id: user });
    } catch (error) {
      console.log(`${error.message}`);
      res
        .status(400)
        .send({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
    }
  };
}

module.exports = UserController;
