// import express
const express = require("express");
const {
  getAllOrdersByUser,
  getOrderByUserId,
  createUser,
  createSessionUser,
  getAllUsers,
  updateUserInfo,
  deleteUser,
} = require("../controllers/user.controller");
const { createUserValidators } = require("../middlewares/Validators");
const { userOrderIdExist } = require("../middlewares/userOrderIdExist");
const {
  protectedSection,
  protectUsersAccount,
  protectAdmin,
  protectOrdersOwners,
} = require("../middlewares/auth.middleware");
const { orderExist } = require("../middlewares/orderExist");
// express router to create endpoints
const userRouter = express.Router();

//Define endpoints here

userRouter.post("/singup", createUserValidators, createUser); // create new user createUser

userRouter.post("/login", createSessionUser); // create a sesion for a exist user. use JWT createSessionUser

// Protecting below endpoints
userRouter.use(protectedSection);

userRouter.get("/", protectAdmin, getAllUsers); // get All Users in database.

userRouter.get("/orders", getAllOrdersByUser); // get all orders created by this user

userRouter.get(
  "/orders/:id",
  orderExist,
  protectOrdersOwners,
  getOrderByUserId
); // search by order id getOrderByUserId

userRouter.patch("/:id", userOrderIdExist, protectUsersAccount, updateUserInfo); // update info user (name, email) updateUserInfo

userRouter.delete("/:id", userOrderIdExist, protectUsersAccount, deleteUser); // desactivated a user status

module.exports = { userRouter };
