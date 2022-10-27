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
    //회원가입
    signup = async (req, res, next) => {
        try {
            const {id, nickname, password, confirm, email, address} = req.body;
            await schema.validateAsync(req.body);
            const registerUserResult = await this.userService.signup(id, nickname, password, confirm, email, address);
            res.status(200).json({message: registerUserResult.message, ok: registerUserResult.ok})
        } catch (error) {
            res.status(412).json({errorMessage: error.message, ok : "false"});
        }
    };

    //로그인
    login = async (req, res, next) => {
        try {
            const {id, password} = req.body;
            const loginResult = await this.userService.login(id, password);
            // console.log(user)
            res.status(200).json(loginResult);
        } catch (error) {
            console.log(`${error.message}`);
            res.status(400).send({errorMessage: error.message});
        }
    };

    //비밀번호 분실시 아이디, 이메일로 회원 확인하여 비밀번호 변경
    changePassword = async (req, res, next) => {
        try {
            const {id, password, confirm, email} = req.body;
            if (!id) {
                throw new Error ("아이디를 입력해주세요");
            }
            if (!email) {
                throw new Error ("이메일을 입력해주세요");
            }
            const changePasswordResult = await this.userService.changePassword(id, password, confirm, email);
            res.status(200).json({message: changePasswordResult});
        } catch (error) {
            console.log(`${error.message}`);
            res.status(400).send({errorMessage: error.message});
        }
    };

    //관리자 권한 임명
    getAdmin = async (req, res, next) => {
        try {
            const {id} = req.body;
            const user = await this.userService.getAdmin(id);

            res.status(200).json({message: '관리자 임명 완료', id: user});
        } catch (error) {
            console.log(`${error.message}`);
            res.status(400).send({errorMessage: error.message});
        }
    };
}

module.exports = UserController;
