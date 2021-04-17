const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes')
const tokenRoutes = require('./routes/tokenRoutes')

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use(cookieParser())

/* Set whitelist for cors */

var whitelist = ['http://localhost:3000']
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
	credentials: true,
}

app.use(cors(corsOptions))

app.use('/api/user', userRoutes)
app.use('/api/token', tokenRoutes)

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
