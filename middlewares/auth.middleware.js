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
    return res.status(403).json({
      status: "error",
      message: "Token was invalid",
    });
  }

  //Verify the token here

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //Verify the token Owner Here

  const user = await User.findOne({ where: decoded.id, status: "active" });

  if (!user) {
    return res.status(403).json({
      status: "error",
      message:
        "The owner of the session is no longer active or token invalidad",
    });
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
    return res.status(403).json({
      status: "error",
      message: "You not are owner on this section",
    });
  }

  // If the ids match, grant access
  next();
};

const protectAdmin = (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== "admin") {
    return res.status(403).json({
      status: "error",
      message: "You are not authorizated to do this",
    });
  }
  next();
};

const protectReviewsOwner = (req, res, next) => {
  const { sessionUser, review } = req;

  if (sessionUser.id !== review.userId) {
    return res.status(403).json({
      status: "error",
      message: "You not are owner in this review",
    });
  }

  next();
};

module.exports = {
  protectedSection,
  protectUsersAccount,
  protectAdmin,
  protectReviewsOwner,
};
