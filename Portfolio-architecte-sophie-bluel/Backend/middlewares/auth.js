const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	console.log(req)
	try {
		const token = req.headers.authorization.split(' ')[1]
		const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN || "F3Q6D10AXCP2NMR2Q8QITZ2Z")
		const userId = decodedToken.userId
		req.auth = { userId }
		if (req.body.userId && req.body.userId !== userId) {
			throw 'Invalid user ID'
		} else {
			next()
		}
	} catch {
		res.status(401).json({
			error: new Error('You are not authenticated')
		})
	} 
}
