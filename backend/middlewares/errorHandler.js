const errorHandler = async (err, req, res, next) => {
  console.log('error:', err)
  if (err.response?.status === 404) {
    res.status(404).json({ error: { message: 'Not found', status: 404 } })
  }
  if (err.response?.data?.error?.message === 'The access token expired') {
    res.status(401).json(err.response.data)
  }
}

module.exports = errorHandler
