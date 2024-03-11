const logger = (req, res, next) => {
  console.log(req.method, req.body)
  next()
}

module.exports = logger
