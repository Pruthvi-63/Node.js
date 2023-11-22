const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const uniqueTokenSecret = "pruthvi123";

const register = asyncHandler(async (req, res) => {
  const { username, contact, email, password } = req.body;
  if (!username || !contact || !password) {
    res.status(400).json({ message: "fill all fields" });
    throw new Error("fill all fields");
  } else {
    const userAvailable = await User.find({ username });
    if (userAvailable.length !== 0) {
      res.status(400).json({ message: "user already available" });
      throw new Error("user already available");
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        contact,
        password: hashedPass,
      });
      res.status(200).json({
        status: 200,
        message: `user created succesfully ${user.id}`,
      });
    }
  }
});

const login = asyncHandler(async (req, res) => {
  //   const contact = await Contact.findById(req.params.id);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "fill all fields" });
    throw new Error("fill all fields");
  } else {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            password: user.password,
            id: user.id,
          },
        },
        uniqueTokenSecret,
        {
          expiresIn: "15min",
        }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({
        message: "username/password is not valid",
      });
    }
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  register,
  login,
  currentUser,
};
