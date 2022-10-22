
const RequestsRepository = require("../repositories/requests.repository")

class RequestsService {
    requestsRepository = new RequestsRepository();
  
  findAllRequest = async () => {

      const allReviews = await this.requestsRepository.findAllRequest();
  
      allReviews.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
  

      return allReviews.map(review => {
        return {
          userId: review.userId,
          request: review.request,
          createdAt: review.createdAt
        }
      });
    }
  
    createRequests = async (userId,request) => {

      const createRequestsData = await this.requestsRepository.createRequests(userId,request);

      return {
        requestId: createRequestsData.null,
        userId: createRequestsData.userId,
        request: createRequestsData.request,
        createdAt: createRequestsData.createdAt,
        updatedAt: createRequestsData.updatedAt
      };
    }

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

    deleteRequests = async (requestId) => {
      await this.requestsRepository.deleteRequests(requestId);
      const deleteReviewsData = await this.requestsRepository.RequestsById(requestId);

      return deleteReviewsData;
      
    }


  }
  
  module.exports = RequestsService;