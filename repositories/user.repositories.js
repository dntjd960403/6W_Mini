const { Users } = require('../models');

class UserRepository {
  //아이디로 회원 조회
  findUserById = async (id) => {
    const user = await Users.findOne({ where: { id } });
    return user;
  };

  //유저아이디(PK)로 회원 조회
  findUserByUserId = async (id, email) => {
    const user = await Users.findOne({ where: { id, email } });
    console.log(user);
    return user;
  };

  //닉네임으로 회원 조회
  findUserByNickname = async (nickname) => {
    const user = await Users.findOne({ where: { nickname } });
    return user;
  };

  //회원가입
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

  //비밀번호 변경
  changePassword = async (id, email, password) => {
    const changedPwData = await Users.update({ password }, { where: { id, email } });
    return changedPwData;
  };

  //관리자 권한 임명
  getAdmin = async (id) => {
    const getAdmin = await Users.update({ admin: null }, { where: { id } });
    return getAdmin;
  };
}

module.exports = UserRepository;
