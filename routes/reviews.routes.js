const express = require('express');
const router = express.Router(); 
const authMiddleware = require("../middlewares/auth-middlewares");

const ReviewsController = require("../controllers/reviews.controller")
const reviewsController = new ReviewsController();

router.get("/", authMiddleware, reviewsController.getReviews);
router.post("/", authMiddleware, reviewsController.createReviews);
router.put("/:reviewId", authMiddleware, reviewsController.updateReviews)
router.delete("/:reviewId", authMiddleware, reviewsController.deleteReviews)


module.exports = router;