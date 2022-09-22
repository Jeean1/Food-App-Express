const { Order } = require("../models/order.model");
const { catchAsync } = require("../utils/catchAsync.utils");

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ where: { id } });

  if (!order) {
    return res.status(404).json({
      status: "error",
      message: "Order not found",
    });
  }

  req.order = order;

  next();
});

module.exports = { orderExist };
