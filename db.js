const mongoose = require('mongoose')
const MONGO_URI = "mongodb+srv://sirishaa2808:IV8yHbCnneDND3oQ@cluster0.dy1ih.mongodb.net/jobseekers?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
   await mongoose.connect(MONGO_URI)
    console.log(`MongoDB Connected`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}
module.exports = connectDB