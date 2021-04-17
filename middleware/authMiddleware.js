const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')
const Token = require('../models/tokenModel.js')

const verifyAccessToken = expressAsyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]

			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.user = await User.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
})

const verifyRefreshToken = expressAsyncHandler(async (req, res, next) => {
	let token

	if (req.cookies.refresh_token) {
		try {
			token = req.cookies.refresh_token
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			const retrievedToken = await Token.findById(decoded.id)
			if (req.user._id === retrievedToken._id) {
				next()
			} else {
				res.status(401)
				throw new Error('Not authorized, token does not match')
			}
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
})

module.exports = { verifyAccessToken, verifyRefreshToken }
