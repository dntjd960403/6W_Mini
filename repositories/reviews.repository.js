const { reviews } = require('../models');

class ReviewsRepository {
  findAllReview = async () => {
    const review = await reviews.findAll();

    return review;
  }
  
   ReviewsById = async (reviewId) => {
    const review = await reviews.findByPk(reviewId);

    return review;

  }

  createReviews = async (userId,review) => {

    const createReviewsData = await reviews.create({ userId,review });

    return createReviewsData;
  }

  updateReviews = async (reviewId,review) => {
    const updateReviewsData = await reviews.update({review},{where: {reviewId}});

    return updateReviewsData;
  }
 

  deleteReviews = async (reviewId) => {
    const deleteReviewsData = await reviews.destroy({ where: {reviewId}});

    return deleteReviewsData;
  }

}

module.exports = ReviewsRepository;
