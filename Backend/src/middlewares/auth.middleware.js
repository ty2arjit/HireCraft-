const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_KEY;
const BlacklistToken = require("../models/blacklist.model");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if( !token ) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const isTokenBlacklisted = await BlacklistToken.findOne({ token });

  if( isTokenBlacklisted ) {
    return res.status(401).json({ message: "Token is invalid" });
  }

  try{
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch(error) {
    return res.status(401).json({ message: "Invalid token" });
  }

  
}

module.exports = {
  authUser
};