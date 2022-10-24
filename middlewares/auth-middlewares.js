const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(authorization)
  const [authType, authToken] = (authorization || '').split(' ');
  //console.log(authToken)

  if (!authToken || authType !== 'Bearer') {
    res.status(401).send({
      errorMessage: '로그인이 필요합니다.',
    });
    return;
  }

  // try {
  // 검증 ( userId만 필요)
  const { userId } = jwt.verify(authToken, 'mySecretKey');

  await Users.findByPk(userId).then((user) => {
    res.locals.user = user;
    //console.log(res.locals.user)
    next();
  });
  // // } catch (err) {
  //     res.status(401).send({
  //         errorMessage: "로그인이 필요한 기능입니다.",
  //     });
  //     console.log(`${err.name} : ${err.message}`);
  // }
};
