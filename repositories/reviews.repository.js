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

  createReviews = async (userId,goodsId,review) => {

    const createReviewsData = await reviews.create({ userId,goodsId,review });

    return createReviewsData;
  }

  updateReviews = async (reviewId,goodsId,review) => {
    const updateReviewsData = await reviews.update({review, goodsId},{where: {reviewId}});

    return updateReviewsData;
  }
 

  deleteReviews = async (reviewId) => {
    const deleteReviewsData = await reviews.destroy({ where: {reviewId}});

    return deleteReviewsData;
  }

}

module.exports = ReviewsRepository;
