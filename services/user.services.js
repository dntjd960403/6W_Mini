const UserRepository = require('../repositories/user.repositories'); //수정수정
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function isRegexValidation(target, regex) {
    return target.search(regex) !== -1;
}

class UserServices {
    userRepository = new UserRepository();
//회원가입
    signup = async (id, nickname, password, confirm, email, address) => {
            if (password !== confirm) {
                throw new Error  ('패스워드가 일치하지 않습니다.');
            }

            const existsUser = await this.userRepository.findUserByNickname(nickname);
            if (existsUser) {
                throw new Error  ('중복된 닉네임입니다.');
            }

            if (isRegexValidation(password, nickname)) {
                throw new Error  ('패스워드에 닉네임이 포함되어 있습니다.');
            }

            const salt = await bcrypt.genSalt(10);
            const encryptedPW = bcrypt.hashSync(password, salt);
            password = encryptedPW;
            console.log(password)
            const createMembersData = await this.userRepository.signup(id, nickname, password, email, address);
            return {
                message: "회원가입 성공",
                ok: true,
            };
    };

    //로그인
    login = async (id, password) => {
        const user = await this.userRepository.findUserById(id);

        if (!user) {
            throw new Error ( "아이디 또는 패스워드를 확인해주세요." );
        }

        const hashedPassword = await bcrypt.compare(password, user.password);
        if (!hashedPassword) {
            throw new Error ( "아이디 또는 패스워드를 확인해주세요." );
        }

        let token = jwt.sign({userId: user.userId, id: user.id}, "mySecretKey");
        return {message: "로그인 성공", token};
    }

    //비밀번호 분실시 아이디, 이메일로 회원 확인하여 비밀번호 변경
    changePassword = async (id, password, confirm, email) => {
        const findUserByUserId = await this.userRepository.findUserByUserId(id, email);
        if (id !== findUserByUserId.id || email !== findUserByUserId.email) {
            throw new Error ("아이디 또는 이메일을 확인해주세요");
        }
        if (password !== confirm) {
            throw new Error ("패스워드와 패스워드 확인란이 달라요");
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPW = bcrypt.hashSync(password, salt);
        console.log(encryptedPW)
        password = encryptedPW;
        console.log(password)

        await this.userRepository.changePassword(id, email, password);
        return ("비밀번호 변경이 완료되었습니다");
    }

    //관리자 권한 임명
    getAdmin = async (id) => {
        await this.userRepository.getAdmin(id);
    };
}

module.exports = UserServices;
