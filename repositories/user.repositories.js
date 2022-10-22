const {Users} = require("../models");

class UserRepository {
    findUserByNickname = async (verifyFormat) => {
        const nickname = verifyFormat.nickname;
        const user = await Users.findOne({where: {nickname}});
        return user;
    };

    signup = async (verifyFormat) => {
        const id = verifyFormat.id;
        const nickname = verifyFormat.nickname;
        const password = verifyFormat.password;
        const email = verifyFormat.email;
        const address = verifyFormat.address;
        const registerUser = await Users.create({id, nickname, password, email, address});
        return registerUser;
    }

    login = async (id, password) => {
        const findUser = await Users.findOne({where: {id, password}});
        return findUser;
    }

    changePassword = async (id, email, password) => {
        const changedPwData = await Users.update({password}, {where: {id, email}}
        );
        return changedPwData;
    };

    findUserById= async (id) => {
        const user = await Users.findOne({where: {id}});
        return user;
    };
}

module.exports = UserRepository;