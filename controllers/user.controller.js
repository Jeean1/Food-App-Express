const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Order } = require("../models/order.model");
const { User } = require("../models/user.model");
const { catchAsync } = require("../utils/catchAsync.utils");
const { Restaurant } = require("../models/restaurant.model");
const { Meal } = require("../models/meal.model");

dotenv.config({ path: "./config.env" });

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll();

  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });
});

const getAllOrdersByUser = catchAsync(async (req, res) => {
  const order = await Order.findAll({
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
  const { id } = req.params;

  const order = await Order.findOne({ where: { id } });

  if (!order) {
    return res.status(404).json({
      status: "error",
      message: "Order id not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

const createUser = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;

  // encrypt password for security

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  newUser.password = undefined;

  return res.status(200).json({
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
    return res.status(400).json({
      stauts: "error",
      message: "User not found or Wrong Credentials",
    });
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

  await user.Update({ status: "desactivated" });

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
