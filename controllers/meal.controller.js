const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");
const { catchAsync } = require("../utils/catchAsync.utils");

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: { status: "active" },
    include: {
      model: Restaurant,
      where: { status: "active" },
      attributes: { exclude: ["restaurantId"] },
    },
  });

  res.status(200).json({
    status: "success",
    data: { meals },
  });
});

const getMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  const mealWithRestaurant = await Meal.findOne({
    where: { id: meal.id, status: "active" },
    include: {
      model: Restaurant,
      where: { status: "active" },
      attributes: { exclude: ["restaurantId"] },
    },
  });

  res.status(200).json({
    status: "success",
    data: { mealWithRestaurant },
  });
});

const createMealOnRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { name, price } = req.body;

  const meal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });

  res.status(201).json({
    status: "success",
    data: { meal },
  });
});

const updateMealInfo = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: "desactivaded" });

  res.status(200).json({
    status: "success",
    message: "Meal eliminated",
  });
});

module.exports = {
  getAllMeals,
  getMealById,
  createMealOnRestaurant,
  updateMealInfo,
  deleteMeal,
};
