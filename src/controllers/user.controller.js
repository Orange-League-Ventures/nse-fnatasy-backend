const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { Sequelize, Op } = require('sequelize');


const signUp = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, password, phone_number, profile_picture } = req.body;

    if( !email){
        return res.status(400).json({ success : false , message : 'Email is required'});
    }

    if( !phone_number){
        return res.status(400).json({ success : false , message : 'PhoneNumber is required'});
    }
    // Check if email is valid
    if (!isValidEmail(email)) {
      return res.status(400).json({ success : false ,message: 'Invalid email format' });
    }

    // Check if phone number is valid
    if (!isValidPhoneNumber(phone_number)) {
      return res.status(400).json({success : false , message: 'Invalid phone number format' });
    }

    // Check if email or phone number already exists in the database
    const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { phone_number }],
        },
      });
    if (existingUser) {
      return res.status(400).json({success : false , message: 'User with this email or phone number already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    const newUser = await User.create({
        name , 
        email, 
        password : hashedPassword , 
        phone_number , 
        profile_picture ,

    });

    // Respond with success message
    res.status(201).json({success : true , message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success : false,  message: 'Internal server error' });
  }
};

// Function to validate email format
const isValidEmail = (email) => {
  // Use a regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate phone number format
const isValidPhoneNumber = (phone_number) => {
  // Use a regular expression to validate phone number format
  const phoneRegex = /^[0-9]{10,}$/;
  return phoneRegex.test(phone_number);
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({success : false, message: 'Email and password are required' });
      }
  
      // Find the user by email in the database
      const user = await User.findOne({ where: { email } });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({success : false, message: 'User not found' });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      // Check if password is valid
      if (!isPasswordValid) {
        return res.status(401).json({ success : false, message: 'Invalid password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({...user.dataValues ,  token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({success : false, message: 'Internal server error' });
    }
  };
  

module.exports = { signUp , login };