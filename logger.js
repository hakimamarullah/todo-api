exports.logger = (req, res, next) =>{
	const time = new Date().toDateString()
	console.log(req.method, req.url, time)
	next()
}