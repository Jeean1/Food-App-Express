// import express
const express = require("express");
const {
  getAllOrdersByUser,
  createOrderForUser,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const { protectedSection } = require("../middlewares/auth.middleware");
const { orderExist } = require("../middlewares/orderExist");
const { createOrderValidators } = require("../middlewares/Validators");
// express router to create endpoints
const ordersRouter = express.Router();

//Define endpoints here

// Protecting below endpoints
ordersRouter.use(protectedSection);

ordersRouter.get("/me", getAllOrdersByUser); // get all orders of a user getAllOrdersByUser

ordersRouter.post("/", createOrderValidators, createOrderForUser); // create a new order for user createOrderForUser

ordersRouter.patch("/:id", orderExist, updateOrder); // update order with status COMPLETED updateOrder

ordersRouter.delete("/:id", orderExist, deleteOrder); // update order with status CANCELLED

module.exports = { ordersRouter };
