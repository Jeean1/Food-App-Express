const dotenv = require("dotenv");
const { AppError } = require("../utils/appError.util");

dotenv.config({ path: "./config.env" });

const sendErrorDev = (error, req, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error,
    stack: error.stack,
  });
};

const sendErrorProd = (error, req, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message || "Something went wrong",
  });
};

const tokenInvalidSignatureSession = () => {
  return new AppError("session invalid", 403);
};

const tokenExpiredError = () => {
  return new AppError("Session expired", 403);
};

const dbUniqueConstraintError = () => {
  return new AppError("The entered email has already been taken", 400);
};

const protectAdminInProd = () => {
  return new AppError("Only admin can do this", 403);
};

const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "fail"; //default values for sequelize

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let err = { ...error }; // make a copy of main error

    if (error.name === "JsonWebTokenError")
      // replace value for function
      err = tokenInvalidSignatureSession();
    else if (error.name === "TokenExpiredError") err = tokenExpiredError();
    else if (error.name === "SequelizeUniqueConstraintError")
      err = dbUniqueConstraintError();
    else if (error.message === "Only admin can do this")
      err = protectAdminInProd();
    sendErrorProd(error, req, res);
  }
};

module.exports = { globalErrorHandler };
