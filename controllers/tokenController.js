const asyncHandler = require('express-async-handler')
const { generateToken } = require('../utils/jwt')
const Token = require('../models/tokenModel.js')

const generateRefreshToken = asyncHandler(async (req, res) => {
	const { _id } = req.user
	const refreshToken = generateToken(_id)

	const token = await Token.updateOne(
		{
			user_id: _id,
			refreshToken: req.cookies.refresh_token,
		},
		{ $set: { refreshToken: refreshToken } }
	)

	if (token) {
		const accessToken = generateToken(_id)

		res.cookie('refresh_token', refreshToken, {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		res.status(201)
		res.json({
			token: accessToken,
		})
	} else {
		res.status(401)
		throw new Error('Invalid data submitted')
	}
})

module.exports = { generateRefreshToken }
