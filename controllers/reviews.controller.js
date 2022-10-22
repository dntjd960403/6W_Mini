const ReviewsService = require('../services/reviews.service');


class ReviewsController {
    reviewsService = new ReviewsService();

  getReviews = async (req, res, next) => {
    try{
    const reviews = await this.reviewsService.findAllReview();

    res.status(200).reviews({ data: reviews })
    }catch(err){
    res.status(400).json({message: err.message})
    }
  }

  createReviews = async (req, res, next) => { 
    const { review } = req.body;
    const { userId } = res.locals.user;
    const createReviewsData = await this.reviewsService.createReviews(userId,review);

    res.status(201).json({ data: createReviewsData });
  }

  updateReviews = async (req, res, next) => {

    const {reviewId} = req.params;
    const {review} = req.body;

    const updateReviewsData = await this.reviewsService.updateReviews(reviewId, review);
      
    res.status(200).send({ reviews: updateReviewsData });
      
    }

    deleteReviews = async (req, res, next) => {
    const {reviewId} = req.params

    const removeReviews = await this.reviewsService.deleteReviews(reviewId);

    res.status(200).json({ data: removeReviews });
    }

  }



module.exports = ReviewsController;