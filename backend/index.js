const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')
const spotifyRouter = require('./controllers/spotifyRouter')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

app.use('/spotify', spotifyRouter)

// Routes
app.post('/login', async (req, res) => {
  axios
    .post(
      'https://accounts.spotify.com/api/token',
      {
        code: req.body.code,
        redirect_uri: process.env.BASE_URL,
        grant_type: 'authorization_code',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            btoa(
              `${process.env.SP_CLIENT_ID}:${process.env.SP_CLIENT_PASSWORD}`
            ),
        },
      }
    )
    .then((response) => {
      res.status(200).json(response.data)
    })
    .catch((error) => {
      console.log(error.message)
      res.status(400).end(error)
    })
})

// Routers

app.listen(process.env.PORT, () => {
  console.log(`Express app listening on port ${process.env.PORT}`)
})
