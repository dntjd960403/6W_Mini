const { reviews } = require('../models');

class ReviewsRepository {
  // 상품리뷰 전체 글보기
  findAllReview = async () => {
    const review = await reviews.findAll();

    return review;
  }
  // 상품리뷰 글 수정,삭제
   ReviewsById = async (reviewId) => {
    const review = await reviews.findByPk(reviewId);

    return review;

  }
// 상품리뷰 글생성
  createReviews = async (userId,goodsId,review) => {

    const createReviewsData = await reviews.create({ userId,goodsId,review });

    return createReviewsData;
  }
// 상품리뷰 글수정
  updateReviews = async (reviewId,review) => {
    const updateReviewsData = await reviews.update({review},{where: {reviewId}});

    return updateReviewsData;
  }
 
// 상품리뷰 글삭제
  deleteReviews = async (reviewId) => {
    const deleteReviewsData = await reviews.destroy({ where: {reviewId}});

    return deleteReviewsData;
  }

}

module.exports = ReviewsRepository;
