// Import express
const express = require("express");
// Import middlewares HTTP
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
// Controllers
const { globalErrorHandler } = require("./controllers/globalError");
// Routes
const { mealsRouter } = require("./routes/meal.router");
const { ordersRouter } = require("./routes/order.router");
const { restaurantRouter } = require("./routes/restaurant.router");
const { userRouter } = require("./routes/user.router");
// Swagger
const { swaggerUI, swaggerSpec } = require("./swaggerConfig");
const swaggerJSDoc = require("swagger-jsdoc");

// ejecute express in a var called app
const app = express();
// configure to work archives json
app.use(express.json());

// Added security headers

app.use(helmet());

// Compress responses

app.use(compression());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else if (process.env.NODE_ENV === "production") app.use(morgan("combined"));

// define routes here

app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/meals", mealsRouter);
app.use("/api/v1/orders", ordersRouter);
app.use(
  "/",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSDoc(swaggerSpec))
);

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
