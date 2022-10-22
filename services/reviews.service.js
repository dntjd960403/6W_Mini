
const ReviewsRepository = require("../repositories/reviews.repository")

class ReviewsService {
  reviewsRepository = new ReviewsRepository();
  
  findAllReview = async () => {

      const allReviews = await this.reviewsRepository.findAllReview();
  
      allReviews.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
  
      return allReviews.map(review => {
        return {
          userId: review.userId,
          goodsId: review.goodsId,
          review: review.review,
          createdAt: review.createdAt
        }
      });
    }
  
    createReviews = async (userId,review) => {

      const createReviewsData = await this.reviewsRepository.createReviews(userId,review);

      return {
        reviewId: createReviewsData.null,
        userId: createReviewsData.userId,
        review: createReviewsData.review,
        createdAt: createReviewsData.createdAt,
        updatedAt: createReviewsData.updatedAt
      };
    }

    updateReviews = async (reviewId,review) => {

      await this.reviewsRepository.updateReviews(reviewId,review);
      const updateReviewsData = await this.reviewsRepository.ReviewsById(reviewId);

      return {
        reviewId: updateReviewsData.null,
        userId: updateReviewsData.userId,
        review: updateReviewsData.review,
        createdAt: updateReviewsData.createdAt,
        updatedAt: updateReviewsData.updatedAt
      };
    }

    deleteReviews = async (reviewId) => {
      await this.reviewsRepository.deleteReviews(reviewId);
      const deleteReviewsData = await this.reviewsRepository.ReviewsById(reviewId);

      return deleteReviewsData;
      
    }

  }
  
  module.exports = ReviewsService;