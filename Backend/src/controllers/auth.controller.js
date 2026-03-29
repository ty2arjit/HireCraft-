const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklist.model');

/**
 * @name: registerUserController
 * @description: Register a new user, expects a username, email, and password in the request body.
 * @access: Public
 */
async function registerUserController (req, res) {
  const { username, email, password } = req.body;

  if(!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required" });
  }

  const newUser = await User.findOne({
    $or: [
      { username },
      { email }
    ]
  });

  if( newUser ) {
    return res.status(400).json({ message: "Username or email already exists" });
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedpassword
  })

  const token = jwt.sign(
    {id: user._id, username: user.username},
    process.env.JWT_KEY,
    { expiresIn: '24h' }
  )

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    },
  });

  await user.save();

}

/**
 * @name: loginUserController
 * @description: Login a user, expects an email and password in the request body.
 * @access: Public
 */
async function loginUserController (req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if( !user ) {
    return res.status(400).json({ message: "Email doesn't exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if( !isPasswordValid ) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {id: user._id, username: user.username},
    process.env.JWT_KEY,
    { expiresIn: '24h' }
  )

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    },
  })
}

/**
 * @name: logoutUserController
 * @description: Logout a user by blacklisting the JWT token and clearing the cookie.
 * @access: Public
 */
async function logoutUserController (req, res) {
  const token = req.cookies.token;

  if( token ) {
    await BlacklistToken.create({ token });
  }

  res.clearCookie("token");

  res.status(200).json({ message: "User logged out successfully" });
}

/**
 * @name: getMeController
 * @description: Get the current logged in user details, expects a valid JWT token in the cookie.
 * @access: Private
 */
async function getMeController (req, res) {

  const user = await User.findById(req.user.id);

  res.status(200).json({
    message: "User details fetched successfully",
  },{
    id: user._id,
    username: user.username,
    email: user.email
  });
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController
}