const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobTitle:{
    type:String,
  },
  name: {
    type: String,
  },
  qualification: {
    type: String,
  },
  passedOutYear: {
    type: String,
  },
  experience: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  resume: {
    type: [String],
  },
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
