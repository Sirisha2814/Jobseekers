const path = require('path')
const express = require('express')
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5001
const cors = require('cors');
connectDB()

const app = express()

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userroute'))
app.use('/api/apply',require('./routes/applyroute'))
app.use('/api/getapply',require('./routes/applyroute'))
app.use('/api/getopenings',require('./routes/openingroute'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
