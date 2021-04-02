const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes')

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
	res.send('API is running...')
})

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)
