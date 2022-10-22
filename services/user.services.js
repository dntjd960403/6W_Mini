const UserRepository = require('../repositories/user.repositories');   //수정수정
const jwt = require("jsonwebtoken");

function isRegexValidation(target, regex) {
    return target.search(regex) !== -1;
}

class UserServices {
    userRepository = new UserRepository();

    signup = async (verifyFormat) => {
        try {
            if (verifyFormat.password !== verifyFormat.confirm) {
                throw new Error({errorMessage: '패스워드가 일치하지 않습니다.'})
            }

            const existsUser = await this.userRepository.findUserByNickname(verifyFormat);
            if (existsUser) {
                throw new Error({errorMessage: '중복된 닉네임입니다.'})
            }

            if (isRegexValidation(verifyFormat.password, verifyFormat.nickname)) {
                throw new Error({errorMessage: '패스워드에 닉네임이 포함되어 있습니다.'})
            }
            await this.userRepository.signup(verifyFormat);

            return "회원가입에 성공하였습니다.";

        } catch (error) {
            console.log(`${error.name} : ${error.message}`);
            throw new Error(error);
        }
    };

    login = async (id, password) => {
        const user = await this.userRepository.login(id, password);
        if (!user || password !== user.password || id !== user.id) {
            return "닉네임 또는 패스워드를 확인해주세요."
        }
        let token = jwt.sign({userId: user.userId}, "mySecretKey");
        return {message: "로그인 성공😎", token: token};
    }

    changePassword = async (id, password, confirm, email) => {
        if (!id || !email) {
            return "아이디 또는 이메일을 확인해주세요"
        }
        if (password !== confirm) {
            return "패스워드와 패스워드 확인란이 달라요"
        }
        await this.userRepository.changePassword(id, email, password);
        return "비밀번호 변경이 완료되었습니다"
    }
}

module.exports = UserServices;