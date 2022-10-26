const ReviewsService = require('../services/reviews.service');


class ReviewsController {
    reviewsService = new ReviewsService();
// 상품리뷰 전체 글보기
  getReviews = async (req, res, next) => {
    try{
    const reviews = await this.reviewsService.findAllReview();

    res.status(200).json({ data: reviews })
    }catch(err){
    res.status(400).json({message: err.message})
    }
  }
// 상품리뷰 글생성
  createReviews = async (req, res, next) => { 
    const { goodsId,review } = req.body;
    const { userId } = res.locals.user;
    await this.reviewsService.createReviews(userId,goodsId,review);

    res.status(201).json({ message: '리뷰작성이 완료되었습니다.' });
  }
// 상품리뷰 글수정
  updateReviews = async (req, res, next) => {

    const {reviewId} = req.params;
    const {review} = req.body;

    await this.reviewsService.updateReviews(reviewId, review);
      
    res.status(200).send({ message: '리뷰작성을 수정하였습니다.' });
      
    }
// 상품리뷰 글삭제
    deleteReviews = async (req, res, next) => {
    const {reviewId} = req.params

    await this.reviewsService.deleteReviews(reviewId);

    res.status(200).json({ message: '리뷰를 삭제하였습니다.' });
    }

  }



module.exports = ReviewsController;