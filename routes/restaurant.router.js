// import express
const express = require("express");
const {
  getAllRestaurant,
  createRestaurant,
  getRestaurantById,
  createReviewRestaurant,
  updateReviewRestaurant,
  updateRestaurantInfo,
  deleteRestaurant,
  deleteReview,
} = require("../controllers/restaurant.controller");
const {
  protectedSection,
  protectAdmin,
  protectReviewsOwner,
} = require("../middlewares/auth.middleware");
const { restauranIdExist } = require("../middlewares/restaurantIdExist");
const { reviewIdExist } = require("../middlewares/reviewIdExist");
const {
  createRestaurantValidators,
  createReviewValidators,
} = require("../middlewares/Validators");
// express router to create endpoints
const restaurantRouter = express.Router();

//Define endpoints here

restaurantRouter.get("/", getAllRestaurant); // get all restaurant

restaurantRouter.get("/:id", restauranIdExist, getRestaurantById); // search by id - getRestaurantById

// Protecting below endpoints
restaurantRouter.use(protectedSection);

restaurantRouter.post(
  "/",
  createRestaurantValidators,
  protectAdmin,
  createRestaurant
); // create new restaurant

restaurantRouter.post(
  "/reviews/:restaurantId",
  createReviewValidators,
  createReviewRestaurant
); // create a review for the restaurant selected.

restaurantRouter.patch(
  "/:id",
  restauranIdExist,
  protectAdmin,
  updateRestaurantInfo
); // only admin can update here - updateRestaurantInfo

restaurantRouter.patch(
  "/reviews/:id",
  reviewIdExist,
  protectReviewsOwner,
  updateReviewRestaurant
); // only autor owner can update this - updateReviewRestaurant

restaurantRouter.delete(
  "/:id",
  restauranIdExist,
  protectAdmin,
  deleteRestaurant
); // only admin can desactivated a restaurant

restaurantRouter.delete(
  "/reviews/:id",
  reviewIdExist,
  protectReviewsOwner,
  deleteReview
); // only autor can desactivated a review

module.exports = { restaurantRouter };
