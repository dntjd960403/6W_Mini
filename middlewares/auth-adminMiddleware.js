const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || '').split(' ');

  if (!authToken || authType !== 'Bearer') {
    res.status(401).send({
      errorMessage: '로그인이 필요합니다.',
    });
    return;
  }

  try {
    const { userId } = jwt.verify(authToken, 'mySecretKey');
    await Users.findByPk(userId).then((user) => {
      if (user['dataValues']['admin']) {
        throw { code: -1 };
      }
      next();
    });
  } catch (err) {
    if (err.code === -1) {
      res.status(401).send({
        errorMessage: '관리자만 접근 가능!',
      });
    } else {
      res.status(401).send({
        errorMessage: '로그인이 필요한 기능입니다.',
      });
      console.log(`${err.name} : ${err.message}`);
    }
  }
};
