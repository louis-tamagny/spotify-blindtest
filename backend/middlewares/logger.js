const logger = (req, res, next) => {
  console.log(req.method, req.baseUrl, req.body, req.get('authorization'))
  next()
}

module.exports = logger
