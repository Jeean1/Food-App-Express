const { catchAsync } = require("../utils/catchAsync.utils");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../models/user.model");

dotenv.config({ path: "./config.env" });

const protectedSection = catchAsync(async (req, res, next) => {
  //get token here
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //extract the token
    // req.headers.authorization = 'Bearer Token'

    token = req.headers.authorization.split(" ")[1]; // -> [Bearer, token]
  }

  if (!token) {
    return next(new AppError("Token was invalid", 403));
  }

  //Verify the token here

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //Verify the token Owner Here

  const user = await User.findOne({ where: decoded.id, status: "active" });

  if (!user) {
    return next(
      new AppError(
        "The owner of the ssion is not longer active or token invalide",
        404
      )
    );
  }

  // Grant Access

  req.sessionUser = user;
  next();
});

// Check the sessionUser to compare to the one that wants to be updated/deleted
const protectUsersAccount = (req, res, next) => {
  const { sessionUser, user } = req;

  // If the users (ids) don't match, send an error, otherwise continue
  if (sessionUser.id !== user.id) {
    return next(new AppError("You not are owner on this section", 403));
  }

  // If the ids match, grant access
  next();
};

const protectAdmin = (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== "admin") {
    return next(new AppError("Only admin can do this", 403));
  }
  next();
};

const protectReviewsOwner = (req, res, next) => {
  const { sessionUser, review } = req;

  if (sessionUser.id !== review.userId) {
    return next(new AppError("You not are owner in this review", 403));
  }

  next();
};

module.exports = {
  protectedSection,
  protectUsersAccount,
  protectAdmin,
  protectReviewsOwner,
};
