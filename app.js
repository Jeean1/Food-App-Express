//import express
const express = require("express");
const { globalErrorHandler } = require("./controllers/globalError");
const { mealsRouter } = require("./routes/meal.router");
const { ordersRouter } = require("./routes/order.router");
const { restaurantRouter } = require("./routes/restaurant.router");
const { userRouter } = require("./routes/user.router");
// ejecute express in a var called app
const app = express();
// configure to work archives json
app.use(express.json());
// define routes here

app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/meals", mealsRouter);
app.use("/api/v1/orders", ordersRouter);

// GLOBAL ERROR HERE

app.use(globalErrorHandler);

//if routes no exist, default error here

app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Don't exist ${req.method} or ${req.url} in this server`,
  });
});
// exports app to configure my server.js
module.exports = { app };
