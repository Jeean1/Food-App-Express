const { Review } = require("../models/review.model");

const reviewIdExist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await Review.findOne({ where: { id } });

    if (!review) {
      return next(new AppError("Review not found", 404));
    }

    req.review = review;

    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { reviewIdExist };
