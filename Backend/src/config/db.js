const mongoose = require("mongoose");
const MongoURI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(MongoURI);

    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to Database:", error);
  }
}

module.exports = connectDB;