const RequestService = require('../services/requests.service');


class RequestsController {
    requestsService = new RequestService();

  getRequests = async (req, res, next) => {
    try{
    const requests = await this.requestsService.findAllRequest();

    res.status(200).reviews({ data: requests })
    }catch(err){
    res.status(400).json({message: err.message})
    }
  }

  createRequests = async (req, res, next) => { 
    const { request } = req.body;
    const { userId } = res.locals.user;
    const createRequestsData = await this.requestsService.createRequests(userId,request);

    res.status(201).json({ data: createRequestsData });
  }

  updateRequests = async (req, res, next) => {

    const {requestId} = req.params;
    const {request} = req.body;

    const updateRequestsData = await this.requestsService.updateRequests(requestId, request);
      
    res.status(200).send({ data: updateRequestsData });
      
    }

    deleteRequests = async (req, res, next) => {
    const {requestId} = req.params

    const removeRequests = await this.requestsService.deleteRequests(requestId);

    res.status(200).json({ data: removeRequests });
    }

  }



module.exports = RequestsController;