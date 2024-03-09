const errorHandler = async (err, req, res, next) => {
  console.log('error', err.message)
  res.status(500).json({ error: err.message })
}

module.exports = errorHandler
