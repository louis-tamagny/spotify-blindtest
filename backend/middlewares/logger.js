const logger = (req, res, next) => {
  console.log(req.method, req.baseUrl)
  next()
}

module.exports = logger
