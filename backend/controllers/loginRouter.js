const express = require('express')
const axios = require('axios')
const { getToken } = require('../login')
require('dotenv').config()

const loginRouter = express.Router()

loginRouter.post('', async (req, res, next) => {
  try {
    const result = await getToken(req.body.code)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter
