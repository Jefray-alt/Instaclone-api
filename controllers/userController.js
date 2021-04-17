const asyncHandler = require('express-async-handler')
const { generateToken } = require('../utils/jwt')
const User = require('../models/userModel.js')
const Token = require('../models/tokenModel.js')

const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password } = req.body
	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(401)
		throw new Error('Email already registered')
	}

	const user = await User.create({
		firstName,
		lastName,
		email,
		password,
	})

	if (user) {
		const refreshToken = generateToken(user._id)
		const token = generateToken(user._id)

		await Token.create({
			user_id: user._id,
			refreshToken: refreshToken,
		})

		res.cookie('refresh_token', refreshToken, {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		res.status(201)
		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			isAdmin: user.isAdmin,
			token,
		})
	} else {
		res.status(401)
		throw new Error('Invalid data submitted')
	}
})

module.exports = { registerUser }
