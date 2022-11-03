// import express
const express = require("express");
const {
  getAllMeals,
  getMealById,
  createMealOnRestaurant,
  updateMealInfo,
  deleteMeal,
} = require("../controllers/meal.controller");
const {
  protectAdmin,
  protectedSection,
} = require("../middlewares/auth.middleware");
const { mealExist } = require("../middlewares/mealExist");
const { createMealValidators } = require("../middlewares/Validators");
// express router to create endpoints
const mealsRouter = express.Router();

//Define endpoints here
mealsRouter.get("/", getAllMeals); // get all meals with status ACTIVE getAllMeals

mealsRouter.get("/:id", mealExist, getMealById); // get a meal with ID with status ACTIVE getMealById

// Protecting below endpoints
mealsRouter.use(protectedSection);

mealsRouter.post(
  "/:id",
  protectAdmin,
  createMealValidators,
  createMealOnRestaurant
); // create a new meal in a restaurant. :id its the id of restaurant createMealOnRestaurant

mealsRouter.patch("/:id", mealExist, protectAdmin, updateMealInfo); // only admin can update here updateMealInfo

mealsRouter.delete("/:id", mealExist, protectAdmin, deleteMeal); // only admin can desactivated a meal

module.exports = { mealsRouter };
