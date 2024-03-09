const express = require('express')
const cors = require('cors')
require('dotenv').config()
const spotifyRouter = require('./controllers/spotifyRouter')
const loginRouter = require('./controllers/loginRouter')
const errorHandler = require('./middlewares/errorHandler')
const logger = require('./middlewares/logger')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/login', loginRouter)
app.use('/spotify', spotifyRouter)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Express app listening on port ${process.env.PORT}`)
})
