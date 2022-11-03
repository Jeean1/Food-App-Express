const { Meal } = require("../models/meal.model");
const { Order } = require("../models/order.model");
const { Restaurant } = require("../models/restaurant.model");
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.utils");

const getAllOrdersByUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const order = await Order.findAll({
    where: { userId: sessionUser.id },
    include: { model: Meal, include: { model: Restaurant } },
  });

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const createOrderForUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const { quantity, mealId } = req.body;

  //get meal info here
  const meal = await Meal.findOne({ where: { id: mealId } });
  //to multiplicate quanity with the original price to totalPrice

  if (!meal) {
    return next(new AppError("Meal not found", 404));
  }

  const totalPrice = meal.price * quantity;

  const order = await Order.create({
    quantity,
    mealId,
    userId: sessionUser.id,
    totalPrice,
  });

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "completed" });

  res.status(200).json({
    status: "success",
    message: "Order completed",
  });
});

const deleteOrder = catchAsync(async (req, res, nex) => {
  const { order } = req;

  await order.update({ status: "cancelled" });

  res.status(200).json({
    status: "success",
    message: "Order cancelled",
  });
});

module.exports = {
  getAllOrdersByUser,
  createOrderForUser,
  updateOrder,
  deleteOrder,
};
