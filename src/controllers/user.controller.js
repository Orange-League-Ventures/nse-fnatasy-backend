const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { Sequelize, Op } = require("sequelize");
 const { isValidEmail, isValidPhoneNumber, validatePassword } =require("../utils/validationUtils"); 

const signupUser = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, password, phone_number, profile_picture } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    if (!phone_number) {
      return res
        .status(400)
        .json({ success: false, message: "PhoneNumber is required" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }
    // Check if email is valid
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // Check if phone number is valid
    if (!isValidPhoneNumber(phone_number)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number format" });
    }

    // Validate password
    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage) {
      return res.status(400).json({ success: false, message: passwordValidationMessage });
    }
    // Check if email or phone number already exists in the database
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phone_number }],
      },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or phone number already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      profile_picture,
    });

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // Find the user by email in the database
    const user = await User.findOne({ where: { email } });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if password is valid
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    res.status(200).json({
      success: true,
      accessToken,
      user: {
        name: user.dataValues.name,
        email: user.dataValues.email,
        phone_number: user.dataValues.phone_number,
        profile_picture: user.dataValues.profile_picture,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

const updateUser = async (req, res) => {
  try {
      const { name, email, password, phone_number, profile_picture } = req.body;
      const userId = req.id;

      const user = await User.findByPk(userId);

      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      // Check if email or phone number is being updated
    if (email && email !== user.email) {
      // If email is being updated, check if it already exists for another user
      const existingEmailUser = await User.findOne({ where: { email } });
      if (existingEmailUser && existingEmailUser.id !== userId) {
        return res.status(400).json({ success: false, message: "Email already exists for another user" });
      }
    }

    if (phone_number && phone_number !== user.phone_number) {
      // If phone number is being updated, check if it already exists for another user
      const existingPhoneUser = await User.findOne({ where: { phone_number } });
      if (existingPhoneUser && existingPhoneUser.id !== userId) {
        return res.status(400).json({ success: false, message: "Phone number already exists for another user" });
      }
    }


      // Update user information
      if (name) user.name = name;
      if (email) user.email = email;
      if (phone_number) user.phone_number = phone_number;
      if (profile_picture) user.profile_picture = profile_picture;

      if (!isValidEmail(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email format" });
      }
  
      // Check if phone number is valid
      if (!isValidPhoneNumber(phone_number)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid phone number format" });
      }

      // Update password if provided
      if (password) {
          // Validate password
          const passwordValidationMessage = validatePassword(password);
          if (passwordValidationMessage) {
              return res.status(400).json({ success: false, message: passwordValidationMessage });
          }

          // Hash the new password
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
      }

      await user.save();

      res.status(200).json({
          success: true,
          message: "User information updated successfully",
          user: {
              name: user.name,
              email: user.email,
              phone_number: user.phone_number,
              profile_picture: user.profile_picture
          }
      });
  } catch (error) {
      console.error("Error updating user information:", error);
      res.status(500).json({ success: false, message: "Internal server error", error : error.message });
  }
};
 
module.exports = { signupUser, loginUser , updateUser };
