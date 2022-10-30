const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Order } = require("../models/order.model");
const { User } = require("../models/user.model");
const { catchAsync } = require("../utils/catchAsync.utils");
const { Restaurant } = require("../models/restaurant.model");
const { Meal } = require("../models/meal.model");
const { AppError } = require("../utils/appError.util");

dotenv.config({ path: "./config.env" });

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });

  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });
});

const getAllOrdersByUser = catchAsync(async (req, res) => {
  const { sessionUser } = req;
  const order = await Order.findAll({
    where: { userId: sessionUser.id },
    include: [
      { model: User, attributes: { exclude: ["password"] } },
      { model: Meal, include: { model: Restaurant } },
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

const getOrderByUserId = catchAsync(async (req, res, next) => {
  const { order } = req;

  if (!order) {
    return next(new AppError("Order id not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

const createUser = catchAsync(async (req, res) => {
  const { username, email, password, role } = req.body;

  // encrypt password for security

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  });
});

const createSessionUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("User not found or Wrong Credentials", 404));
  }

  // Remove password from response
  user.password = undefined;

  // Generate JWT (payload, secretOrPrivateKey, options)
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({
    status: "success",
    data: { user, token },
  });
});

const updateUserInfo = catchAsync(async (req, res) => {
  const { username, email } = req.body;
  const { user } = req;

  await user.update({ username, email, role: "normal" });

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: "desactivated" });

  res.status(200).json({
    status: "success",
    message: "User desactivated",
  });
});

module.exports = {
  getAllOrdersByUser,
  getOrderByUserId,
  createUser,
  createSessionUser,
  updateUserInfo,
  getAllUsers,
  deleteUser,
};
