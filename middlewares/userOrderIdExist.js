const { User } = require("../models/user.model");
const { catchAsync } = require("../utils/catchAsync.utils");

const userOrderIdExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  req.user = user;

  next();
});

module.exports = { userOrderIdExist };
