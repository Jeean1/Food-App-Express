const { Meal } = require("./meal.model");
const { Order } = require("./order.model");
const { Restaurant } = require("./restaurant.model");
const { Review } = require("./review.model");
const { User } = require("./user.model");

const initModel = () => {
  //Relations User
  // User 1 <----->  M Order
  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  //User 1 <----> M Reviews
  User.hasMany(Review, { foreignKey: "userId" });

  //Relations Restaurant
  // Restaurant 1 <----> M Meals
  Restaurant.hasMany(Meal, { foreignKey: "restaurantId" });
  Meal.belongsTo(Restaurant);

  //Restaurant 1 <----> M Review
  Restaurant.hasMany(Review, { foreignKey: "restaurantId" });

  //Relations relationship between meal and order

  // Order 1 <----> 1 Meal

  Meal.hasOne(Order, { foreignKey: "mealId" });
  Order.belongsTo(Meal);
};

module.exports = { initModel };
