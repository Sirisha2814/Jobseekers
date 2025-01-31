const express = require('express')
const router = express.Router()
const {
  register,login,
} = require('../controller/usercontroller')

const { protect } = require('../middleware/authMiddleware')

router.post('/', register)
router.post('/login',login)




module.exports = router
