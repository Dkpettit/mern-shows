const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors())
app.use('/api/shows', require('./routes/showRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on ${port}`))

