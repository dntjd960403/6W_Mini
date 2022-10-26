const { requests } = require('../models');

class RequestsRepository {
  // 상품요청 전체 글보기
    findAllRequest = async () => {
    const request = await requests.findAll();

    return request;
  }

  findById = async (userId) => {
    const request = await requests.findByPk(userId);

    return request;

  }
  // 상품요청 수정삭제 아이디값찾기
  RequestsById = async (requestId) => {
    const request = await requests.findByPk(requestId);

    return request;

  }
// 상품요청 생성하기
  createRequests = async (nickname,request) => {

    const createRequestsData = await requests.create({ nickname,request });

    return createRequestsData;
  }
// 상품요청 수정하기
  updateRequests = async (requestId,request) => {
    const updateRequestsData = await requests.update({request},{where: {requestId}});

    return updateRequestsData;
  }
 
// 상품요청한거 삭제하기
  deleteRequests = async (requestId) => {
    const deleteRequestsData = await requests.destroy({ where: {requestId}});

    return deleteRequestsData;
  }

}

module.exports = RequestsRepository;
