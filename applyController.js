const asyncHandler = require('express-async-handler');
const JobApplication = require('../models/Applymodel'); 

const applyForJob = asyncHandler(async (req, res) => {
  try {
    const signedInUser = req.user;

    const {
      jobTitle,
      name,
      qualification,
      passedOutYear,
      experience,
      email,
      phoneNumber,
      resume,
    } = req.body;

       
    // Create a new job application with the signed-in user's email and phone number
    const jobApplication = new JobApplication({
      jobTitle,
      name,
      qualification,
      passedOutYear,
      experience,
      email: email || signedInUser.email,
      phoneNumber: phoneNumber || signedInUser.phoneNumber,
      resume,
    });

    // Save the job application to the database
    const savedJobApplication = await jobApplication.save();

    res.status(201).json(savedJobApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getAllapply = asyncHandler(async (req, res) => {
    const openings = await JobApplication.find();
    res.json(openings);
  });

module.exports = { applyForJob,getAllapply };  
