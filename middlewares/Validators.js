const { body, validationResult } = require("express-validator");

// Utils
// const { AppError } = require("../utils/appError.util");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return res.status(400).json({
      status: "error",
      message,
    });
  }

  next();
};

const createUserValidators = [
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

const createRestaurantValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("address")
    .isString()
    .withMessage("Address must be a string")
    .isLength({ min: 3 })
    .withMessage("Address must be at least 3 characters long"),
  checkValidations,
];

const createMealValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .isLength({ min: 1 })
    .withMessage("Price must be at least 1 characters long"),
  checkValidations,
];

const createOrderValidators = [
  body("quantity")
    .isNumeric()
    .withMessage("Quantity must be a number")
    .notEmpty()
    .withMessage("Quantity cannot be empty")
    .isLength({ min: 1 })
    .withMessage("Quantity must be at least 1 digit"),

  checkValidations,
];

const createReviewValidators = [
  body("comment")
    .isString()
    .withMessage("comment must be a string")
    .notEmpty()
    .withMessage("comment cannot be empty")
    .isLength({ min: 5 })
    .withMessage("comment must be at least 5 characters"),
  body("rating")
    .isNumeric()
    .withMessage("rating must be a number")
    .notEmpty()
    .withMessage("rating cannot be empty")
    .isLength({ min: 1 })
    .withMessage("rating must be at least 1 digit"),

  checkValidations,
];

module.exports = {
  createUserValidators,
  createRestaurantValidators,
  createMealValidators,
  createOrderValidators,
  createReviewValidators,
};
