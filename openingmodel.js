const mongoose = require('mongoose');

const openingSchema = new mongoose.Schema({
  jobTitle: { 
    type: String, 
 },
  department: { 
    type: String,
},
  specialization: { 
    type: String 
},
  location: { 
    type: String 
},
  isRemote: { 
    type: Boolean,
     default: false 
    },
  experience: { 
    type: String 
},
  keywords: { 
    type: [String],
},
  skills: { 
    type: String 
},
  jobDescription: { 
    type: String,
},
});

const Opening = mongoose.model('Opening', openingSchema);

module.exports = Opening;
