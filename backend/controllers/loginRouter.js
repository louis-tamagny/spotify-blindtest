const express = require('express')
const axios = require('axios')
const { getToken, refreshToken } = require('../login')
require('dotenv').config()

const loginRouter = express.Router()

loginRouter.post('/accesstoken', async (req, res, next) => {
  try {
    const result = await getToken(req.body.code)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

loginRouter.post('/refreshtoken', async (req, res, next) => {
  try {
    const result = await refreshToken(req.body.refresh_token)
    res.status(200).json({ ...result, refresh_token: req.body.refresh_token })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter
