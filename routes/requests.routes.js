const express = require('express');
const router = express.Router(); 
const authMiddleware = require("../middlewares/auth-middlewares");

const RequestsController = require("../controllers/requests.controller")
const requestsController = new RequestsController();

router.get("/", authMiddleware, requestsController.getRequests);
router.post("/", authMiddleware, requestsController.createRequests);
router.put("/:requestsId", authMiddleware, requestsController.updateRequests)
router.delete("/:requestsId", authMiddleware, requestsController.deleteRequests)


module.exports = router;