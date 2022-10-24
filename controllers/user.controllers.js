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
  email: Joi.string().pattern(re_email).required(),
  address: Joi.string().required(),
});

class UserController {
  userService = new UserService();
  signup = async (req, res, next) => {
    try {
      const { id, nickname, password, confirm, email, address } = req.body;
      await schema.validateAsync(req.body);
      const registerUserResult = await this.userService.signup( id, nickname, password, confirm, email, address );
      res.status(200).json({message: registerUserResult})
    } catch (error) {
      //console.log(`${error.message}`);
      res.status(412).json({errorMessage: '회원가입 실패'});
    }
  };

  login = async (req, res, next) => {
    try {
      const {id, password} = req.body;
      const loginResult = await this.userService.login(id, password);
      // console.log(user)
      res.status(200).json(loginResult);
    } catch (error) {
      console.log(`${error.message}`);
      res.status(400).send({errorMessage: "요청한 데이터 형식이 올바르지 않습니다."});
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const {id, password, confirm, email} = req.body;
      const {userId} = res.locals.user;
      console.log(userId);
      const changePasswordResult = await this.userService.changePassword(id, password, confirm, email, userId);
      res.status(200).json({message: changePasswordResult});
    } catch (error) {
      console.log(`${error.message}`);
      res.status(400).send({errorMessage: "요청한 데이터 형식이 올바르지 않습니다."});
    }
  };

  //관리자 권한 임명
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
