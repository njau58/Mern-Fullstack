const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");

// @desc Register new user
// @route api/register
//@ access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //ensure all fields are not empty
  if (!name || !email || !password) {
    //no content
    res.status(204);
    throw new Error("Please add all the fields.");
  }
  //check if user exist
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    res.status(409);
    throw new Error("User already exist.");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Register user
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(422);
    //unprocessable entity
    throw new Error("Invalid user data");
  }
});

//@desc Login user
//@route api/login
//@access Private

//Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(403);
    throw new Error("User not registered!");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(422);
    throw new Error("Invalid credential.");
  }
});

//@desc get user
//@route api/me
//@access Private

const getMe = asyncHandler(async (req, res) => {
  const { id, name, email } = req.user;

  res.json({
    id,
    name,
    email,
  });
});

// Generate JWT
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
