
const ReviewsRepository = require("../repositories/reviews.repository")

class ReviewsService {
  reviewsRepository = new ReviewsRepository();
  // 상품리뷰 전체 글보기
  findAllReview = async () => {

      const allReviews = await this.reviewsRepository.findAllReview();
  
      allReviews.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
  
      return allReviews.map(review => {
        return {
          goodsId: review.goodsId,
          review: review.review
        }
      });
    }
  // 상품리뷰 글생성
    createReviews = async (userId,goodsId,review) => {

      const createReviewsData = await this.reviewsRepository.createReviews(userId,goodsId,review);

      return {
        reviewId: createReviewsData.null,
        goodsId: createReviewsData.goodsId,
        review: createReviewsData.review,
        createdAt: createReviewsData.createdAt,
        updatedAt: createReviewsData.updatedAt
      };
    }
// 상품리뷰 글수정
    updateReviews = async (reviewId,review) => {

      const updateReviewsData = await this.reviewsRepository.updateReviews(reviewId,review);
      // const updateReviewsData = await this.reviewsRepository.ReviewsById(reviewId);

      return {
        reviewId: updateReviewsData.null,
        userId: updateReviewsData.userId,
        review: updateReviewsData.review,
        createdAt: updateReviewsData.createdAt,
        updatedAt: updateReviewsData.updatedAt
      };
    }
// 상품리뷰 글삭제
    deleteReviews = async (reviewId) => {
      await this.reviewsRepository.deleteReviews(reviewId);
      const deleteReviewsData = await this.reviewsRepository.ReviewsById(reviewId);

      return deleteReviewsData;
      
    }

  }
  
  module.exports = ReviewsService;