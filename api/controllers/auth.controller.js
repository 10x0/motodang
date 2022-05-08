const { User } = require("../models");
const asyncHandler = require("../handlers/async.handler");
const ErrorHandler = require("../handlers/error.handler");
const { sendToken } = require("../handlers/jwt.handler");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, username, email, password } = req.body;
  const user = await User.create({ name, username, email, password });
  sendToken(user, 201, res);
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // checking if user has given both
  if (!username || !password) {
    return next(
      new ErrorHandler("Please provide both username and password.", 400)
    );
  }

  const user = await User.findOne({ where: { username } });

  if (!user)
    return next(new ErrorHandler("Invalid username or password.", 401));
  const passwordMatched = await User.validatePassword(password, user.password);

  if (!passwordMatched) {
    return next(new ErrorHandler("Invalid email or password."), 401);
  }

  sendToken(user, 200, res);
});
