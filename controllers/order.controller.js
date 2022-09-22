const { Meal } = require("../models/meal.model");
const { Order } = require("../models/order.model");
const { User } = require("../models/user.model");
const { catchAsync } = require("../utils/catchAsync.utils");

const getAllOrdersByUser = catchAsync(async (req, res, next) => {
  const order = await Order.findAll({
    include: { model: User, attributes: { exclude: ["password"] } },
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
    message: "Order its completed",
  });
});

const deleteOrder = catchAsync(async (req, res, nex) => {
  const { order } = req;

  await order.update({ status: "cancelled" });

  res.status(200).json({
    status: "success",
    message: "Order its cancelled",
  });
});

module.exports = {
  getAllOrdersByUser,
  createOrderForUser,
  updateOrder,
  deleteOrder,
};
