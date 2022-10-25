const RequestService = require('../services/requests.service');


class RequestsController {
    requestsService = new RequestService();

  getRequests = async (req, res, next) => {
    try{
    const requests = await this.requestsService.findAllRequest();
    
     res.status(200).json({ data: requests })
    }catch(err){
    res.status(400).json({message: err.message})
    }
   
    
  }

  createRequests = async (req, res, next) => { 
    const { request } = req.body;
    const { userId } = res.locals.user;
    await this.requestsService.createRequests(userId,request);

    res.status(201).json({ message: '상품요청하였습니다.' });
  }

  updateRequests = async (req, res, next) => {

    const {requestId} = req.params;
    const {request} = req.body;

    await this.requestsService.updateRequests(requestId, request);
      
    res.status(200).send({ message: '상품변경요청하였습니다.' });
      
    }

    deleteRequests = async (req, res, next) => {
    const {requestId} = req.params

    await this.requestsService.deleteRequests(requestId);

    res.status(200).json({ message: '정상적으로 삭제되었습니다.' });
    }

  }



module.exports = RequestsController;