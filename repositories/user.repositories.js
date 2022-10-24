const { Users } = require('../models');

class UserRepository {
  findUserByNickname = async (nickname) => {
    const user = await Users.findOne({ where: { nickname } });
    return user;
  };

  findUserById = async (id) => {
    const user = await Users.findOne({ where: { id } });
    return user;
}

  signup = async (id, nickname, password, email, address) => {
    const registerUser = await Users.create({
      id,
      nickname,
      password,
      email,
      address,
    });
    return registerUser;
  };

  login = async (id, hashedPassword) => {
    const findUser = await Users.findOne({ where: { id, password: hashedPassword } });
    return findUser;
  };

  changePassword = async (id, email, password) => {
    const changedPwData = await Users.update({ password }, { where: { id, email } });
    return changedPwData;
  };

  findUserByUserId = async (userId) => {
    const user = await Users.findOne({ where: { userId } });
    console.log(user);
    return user;
  };
  //관리자 권한 임명
  getAdmin = async (id) => {
    const getAdmin = await Users.update({ admin: null }, { where: { id } });
    return getAdmin;
  };
}

module.exports = UserRepository;
