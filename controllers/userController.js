const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require('../models/userModel.js')

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
		res.status(201)
		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('Invalid data submitted')
	}
})

module.exports = { registerUser }
