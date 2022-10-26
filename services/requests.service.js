
const RequestsRepository = require("../repositories/requests.repository")

class RequestsService {
    requestsRepository = new RequestsRepository();
  // 상품요청 전체 글보기
  findAllRequest = async () => {

      const allRequests = await this.requestsRepository.findAllRequest();

      allRequests.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
  

      return allRequests.map(request => {
        return {
          nickname: request.nickname,
          request: request.request
        }
      });
    }
  // 상품요청 생성하기
    createRequests = async (nickname,request) => {

      const createRequestsData = await this.requestsRepository.createRequests(nickname,request);

      return {
        requestId: createRequestsData.null,
        nickname: createRequestsData.nickname,
        request: createRequestsData.request,
        createdAt: createRequestsData.createdAt,
        updatedAt: createRequestsData.updatedAt
      };
    }
// 상품요청 수정하기
    updateRequests = async (requestId,request) => {

      await this.requestsRepository.updateRequests(requestId,request);
      const updateRequestsData = await this.requestsRepository.RequestsById(requestId);

      return {
        requestId: updateRequestsData.null,
        userId: updateRequestsData.userId,
        request: updateRequestsData.request,
        createdAt: updateRequestsData.createdAt,
        updatedAt: updateRequestsData.updatedAt
      };
    }
// 상품요청한거 삭제하기
    deleteRequests = async (requestId) => {
      await this.requestsRepository.deleteRequests(requestId);
      const deleteReviewsData = await this.requestsRepository.RequestsById(requestId);

      return deleteReviewsData;
      
    }


  }
  
  module.exports = RequestsService;