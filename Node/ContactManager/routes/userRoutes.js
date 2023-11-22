const express = require("express");
const router = express.Router();
const userControl = require("../controller/userController.js");
const { validateToken } = require("../middlewares/tokenHandler.js");
// using router for http methods
router
  .post("/login", userControl.login)
  .get("/current", validateToken, userControl.currentUser)
  .post("/register", userControl.register);

module.exports = {
  userRouter: router,
};
