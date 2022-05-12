const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { render } = require("express/lib/response");
const nodemailer = require("nodemailer");

// @desc Register new user
// @route api/register
//@ access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, img } = req.body;
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
  try {
    //Register user
    const user = await userModel.create({
      name,
      email,
      img,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        image: user.img,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      //res.status(<your status code>).send(<your response>);
      res.status(400).send("Customized Response");
      console.log("too big");
    }
  }

  // else {
  //     res.status(422);
  //     //unprocessable entity
  //     throw new Error("Invalid user data");
  //   }
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
      image: user.img,
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

//@desc Forgot password
//@route api/forgot-password
//@access public

const forgotPassword = async (req, res) => {
  //get
  if (req.method === "GET") {
    res.render("forgot-password", { email: "email", error: "error" });
  }

  //post

  if (req.method === "POST") {
    const { email } = req.body;

    //check if email exist
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.render("not-found");
    } else {
      const secret = process.env.JWT_SECRET + user.password;
      const payload = {
        email: user.email,
        id: user.id,
      };

      const token = jwt.sign(payload, secret, { expiresIn: "10m" });
      const link = `https://mernnjau.herokuapp.com/api/reset-password/${user.id}/${token}`;

      var transporter = nodemailer.createTransport({
        host: "lon105.truehost.cloud",
        port: 465,
        auth: {
          user: "developer@softlab.co.ke",
          pass: process.env.MAILER_PASS
        },
      });
      let from = ` Softlab Team <developer@softlab.co.ke>`;
      var mailOptions = {
        from: from,
        to: `${email}`,
        subject: "Reset your password ",
        text: `
  Hi ${user.name}, 

  Someone (hopefully you) has requested a password reset for your Softlab Crud account. Follow the link below to set a new password:

${link}
  
  If you don't wish to reset your password, disregard this email and no action will be taken.

  Kind regards
  Softlab Team
  
  `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.render("confirmation");
        }
      });
    }
  }
};

const resetPassword = async (req, res) => {
  if (req.method === "GET") {
    const { id, token } = req.params;
    //check validity and existence of id
    const user = await userModel.findOne({ id });
    if (id !== user.id) {
      res.send("Invalid id");
      return;
    }
    const secret = process.env.JWT_SECRET + user.password;

    try {
      const payload = jwt.verify(token, secret);

      res.render("reset-password", { email: user.email, error: null });
    } catch (error) {
      res.send(error);
    }
  }

  if (req.method === "POST") {
    const { id, token } = req.params;

    const { password, confirmPassword } = req.body;

    //check validity and existence of id
    const user = await userModel.findOne({ id });
    console.log(user);
    if (id !== user.id) {
      res.send("Invalid id");
      return;
    }

    if (password !== confirmPassword) {
      res.render("reset-password", {
        email: user.email,
        error: "password do not match.",
      });
      return
     
    }
    const secret = process.env.JWT_SECRET + user.password;

    try {
      const payload = jwt.verify(token, secret);

      //check if password match
      //ensure to hash


      //Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const updated = await userModel.findByIdAndUpdate(
        { _id: id },
        { password: hashedPassword }
      );

      res.render("confirmation-reset");
    } catch (error) {
      res.send(error.message);
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
};
