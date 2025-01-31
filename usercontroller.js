const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Usermodel');

const register = asyncHandler(async (req, res) => {
  const { username,email,phoneNumber,password} = req.body;

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user = await User.create({
    username,
    email,
    phoneNumber,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      Email: user.email,
      PhoneNumber:user.phoneNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const login = asyncHandler(async (req, res) => {
  const { email,phoneNumber,password} = req.body;
  if (!email || !phoneNumber || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const PasswordValid = await bcrypt.compare(password, User.password);
  if (!PasswordValid) {
    res.status(401);
    throw new Error('Incorrect password');
   }

  const existingUser = await User.findOne({ $and: [{ email }] });

  if (!existingUser) {
    res.status(401);
    throw new Error('Email Does Not Match');
    
  }
  if (await bcrypt.compare(password, existingUser.password)) {
    const token = generateToken(existingUser._id);

    res.status(200).json({
      _id: existingUser._id,
      email: existingUser.email,
      phoneNumber:existingUser.phoneNumber,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const JWT_SECRET = 'abc123';
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  register,
  login,
};
