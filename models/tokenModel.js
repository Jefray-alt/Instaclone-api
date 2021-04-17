const mongoose = require('mongoose')
const { generateToken } = require('../utils/jwt')

const tokenSchema = mongoose.Schema(
	{
		user_id: {
			type: String,
			required: true,
		},
		refreshToken: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token
