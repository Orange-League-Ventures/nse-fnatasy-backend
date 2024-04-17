const express = require("express");
const router = express.Router();

const { JWTAuth } = require("../../../middlewares");

const {
  signupUser,
  loginUser,
  updateUser,
} = require("../../../controllers/user.controller");

router.post("/signup", signupUser);
router.post("/login", loginUser);

// Route for updating user information
router.put("/update", [JWTAuth.verifyToken], updateUser);

module.exports = router;
