const { Restaurant } = require("../models/restaurant.model");
const { Review } = require("../models/review.model");
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.utils");

const getAllRestaurant = catchAsync(async (req, res) => {
  const restaurant = await Restaurant.findAll({
    where: { status: "active" },
    include: {
      model: Review,
      where: { status: "active" },
      attributes: { exclude: ["restaurantId"] },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      restaurant,
    },
  });
});

const getRestaurantById = catchAsync(async (req, res, nex) => {
  const { restaurant } = req;

  const restaurantWithReview = await Restaurant.findOne({
    where: { id: restaurant.id, status: "active" },
    include: {
      model: Review,
      where: { status: "active" },
      attributes: { exclude: ["restaurantId"] },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      restaurantWithReview,
    },
  });
});

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({ name, address, rating });

  res.status(200).json({
    status: "success",
    data: {
      restaurant,
    },
  });
});

const updateRestaurantInfo = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const { name, address } = req.body;

  await restaurant.update({ name, address });

  res.status(200).json({
    status: "success",
    data: {
      restaurant,
    },
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: "deleted" });

  res.status(200).json({
    status: "success",
    message: "Restaurant deleted",
  });
});

// ------ Reviews Restaurant

const createReviewRestaurant = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const { sessionUser } = req;
  const { comment, rating } = req.body;

  if (!restaurantId) {
    return next(new AppError("Restaurant not found", 404));
  }

  const review = await Review.create({
    userId: sessionUser.id,
    comment,
    restaurantId,
    rating,
  });

  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

const updateReviewRestaurant = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;

  await review.update({ comment, rating });

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: "deleted" });

  res.status(200).json({
    status: "success",
    message: "review deleted",
  });
});

module.exports = {
  getAllRestaurant,
  createRestaurant,
  getRestaurantById,
  createReviewRestaurant,
  updateReviewRestaurant,
  updateRestaurantInfo,
  deleteRestaurant,
  deleteReview,
};
