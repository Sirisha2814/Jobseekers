const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createOpening, getAllOpenings } = require('../controller/openingController');

router.post('/', protect, createOpening);
router.get('/', getAllOpenings);
module.exports = router;
