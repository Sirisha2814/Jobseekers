const asyncHandler = require('express-async-handler');
const Opening = require('../models/openingmodel');

// Create a new opening
const createOpening = asyncHandler(async (req, res) => {
  const {
    jobTitle,
    department,
    specialization,
    location,
    isRemote,
    experience,
    keywords,
    skills,
    jobDescription,
  } = req.body;

  // Check if an opening already exists
  const existingOpening = await Opening.findOne({ jobTitle });

  if (existingOpening) {
    res.status(400);
    throw new Error('Opening already added');
  }

  // Create the opening
  const opening = await Opening.create({
    jobTitle,
    department,
    specialization,
    location,
    isRemote,
    experience,
    keywords,
    skills,
    jobDescription,
  });

  if (opening) {
    res.status(201).json({
      _id: opening._id,
      jobTitle: opening.jobTitle,
      department: opening.department,
      specialization: opening.specialization,
      location: opening.location,
      isRemote: opening.isRemote,
      experience: opening.experience,
      keywords: opening.keywords,
      skills: opening.skills,
      jobDescription: opening.jobDescription,
    });
  } else {
    res.status(400);
    throw new Error('Invalid opening data');
  }
});

const getAllOpenings = asyncHandler(async (req, res) => {
  const openings = await Opening.find();
  res.json(openings);
});

module.exports = {
  createOpening,
  getAllOpenings,
};
