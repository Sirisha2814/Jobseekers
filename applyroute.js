const express = require('express');
const router = express.Router();
const { applyForJob, getAllapply } = require('../controller/applyController'); 

const { protect } = require('../middleware/authMiddleware');

router.post('/',protect, applyForJob); 
router.get('/',getAllapply)
module.exports = router;
