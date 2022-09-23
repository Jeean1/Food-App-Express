const { Restaurant } = require("../models/restaurant.model");
const { AppError } = require("../utils/appError.util");

const restauranIdExist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({ where: { id } });

    if (!restaurant) {
      return next(new AppError("Restaurant not found", 404));
    }

    req.restaurant = restaurant;

    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { restauranIdExist };
