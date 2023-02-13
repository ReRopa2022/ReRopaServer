const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
// @desc   Register a new user
// @route  /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, passwordConfirm, isManager } =
    req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please include all fields.");
  }

  //Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  //Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    isManager,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

// @desc   Login a user
// @route  /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //1) Check if email and password exist
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password.");
  }

  //2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401);
    throw new Error("Incorrect email or password.");
  }
  res.status(200).json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
    isManager: user.isManager,
  });
});

// @desc   Get current user
// @route  /api/users/me
// @access Private

const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    isManager: req.user.isManager,
  };
  res.status(200).json(user);
});

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
