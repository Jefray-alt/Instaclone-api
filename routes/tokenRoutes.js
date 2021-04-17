const express = require('express')
const { generateRefreshToken } = require('../controllers/tokenController')
const {
	verifyAccessToken,
	verifyRefreshToken,
} = require('../middleware/authMiddleware')
const router = express.Router()

router
	.route('/refresh')
	.post([verifyAccessToken, verifyRefreshToken], generateRefreshToken)

module.exports = router
