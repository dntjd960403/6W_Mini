const express = require('express');
const router = express.Router(); 
const authMiddleware = require("../middlewares/auth-middlewares");

const RequestsController = require("../controllers/requests.controller")
const requestsController = new RequestsController();

router.get("/", authMiddleware, requestsController.getRequests);
router.post("/", authMiddleware, requestsController.createRequests);
router.put("/:requestId", authMiddleware, requestsController.updateRequests)
router.delete("/:requestId", authMiddleware, requestsController.deleteRequests)


module.exports = router;