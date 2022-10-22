const { requests } = require('../models');

class RequestsRepository {
    findAllRequest = async () => {
    const request = await requests.findAll();

    return request;
  }
  
  RequestsById = async (requestId) => {
    const request = await requests.findByPk(requestId);

    return request;

  }

  createRequests = async (userId,request) => {

    const createRequestsData = await requests.create({ userId,request });

    return createRequestsData;
  }

  updateRequests = async (requestId,request) => {
    const updateRequestsData = await requests.update({request},{where: {requestId}});

    return updateRequestsData;
  }
 

  deleteRequests = async (requestId) => {
    const deleteRequestsData = await requests.destroy({ where: {requestId}});

    return deleteRequestsData;
  }

}

module.exports = RequestsRepository;
