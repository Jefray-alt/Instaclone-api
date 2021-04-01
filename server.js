const express = require('express')
const dotenv = require('dotenv')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes')

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/user', userRoutes)

app.use(notFound)

app.use(errorHandler)

app.get('/', (req, res) => {
	res.send('API is running...')
})

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)
