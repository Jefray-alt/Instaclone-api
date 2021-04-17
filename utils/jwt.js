const jwt = require('jsonwebtoken')

const generateToken = (id, refresh = false) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: refresh ? '7d' : '15m',
	})
}

module.exports = {
	generateToken,
}
