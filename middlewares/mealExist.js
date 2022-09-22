const { Meal } = require("../models/meal.model");
const { catchAsync } = require("../utils/catchAsync.utils");

const mealExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({ where: { id } });

  if (!meal) {
    return res.status(404).json({
      status: "error",
      message: "meal not found",
    });
  }

  req.meal = meal;

  next();
});
module.exports = { mealExist };
