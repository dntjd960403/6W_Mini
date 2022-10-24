const UserRepository = require('../repositories/user.repositories'); //수정수정
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function isRegexValidation(target, regex) {
    return target.search(regex) !== -1;
}

class UserServices {
    userRepository = new UserRepository();

    signup = async (id, nickname, password, confirm, email, address) => {
        try {
            if (password.password !== password.confirm) {
                return ('패스워드가 일치하지 않습니다.')
            }

            const existsUser = await this.userRepository.findUserByNickname(nickname);
            if (existsUser) {
                return ('중복된 닉네임입니다.')
            }

            if (isRegexValidation(password, nickname)) {
                return ('패스워드에 닉네임이 포함되어 있습니다.')
            }

            const salt = await bcrypt.genSalt(10);
            const enpryptedPW = bcrypt.hashSync(password, salt);
            password = enpryptedPW;
            const createMembersData = await this.userRepository.signup(id, nickname, password, email, address);

            return "회원가입 성공";

        } catch (error) {
            //console.log(`${error.name} : ${error.message}`);
            return "회원가입 실패";
        }
    };

    login = async (id, password) => {
        const user = await this.userRepository.findUserById(id);
        const hashedPassword = await bcrypt.compare(password, user.password);
        // console.log(hashedPassword)

        if (!user || !hashedPassword) {
            return {message: "아이디 또는 패스워드를 확인해주세요."}
        }
        let token = jwt.sign({userId: user.userId}, "mySecretKey");
        return {message: "로그인 성공", token};
    }

    changePassword = async (id, password, confirm, email, userId) => {
        if (!id) {
            return "아이디를 입력해주세요"
        }
        if (!email) {
            return "이메일을 입력해주세요"
        }
        const findUserByUserId = await this.userRepository.findUserByUserId(userId);
        if (id !== findUserByUserId.id || email !== findUserByUserId.email) {
            return "아이디 또는 이메일을 확인해주세요"
        }
        if (password !== confirm) {
            return "패스워드와 패스워드 확인란이 달라요"
        }
        await this.userRepository.changePassword(id, email, password);
        return "비밀번호 변경이 완료되었습니다"
    }
    //관리자 권한 임명
    getAdmin = async (id) => {
        await this.userRepository.getAdmin(id);
    };
}

module.exports = UserServices;
