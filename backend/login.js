const axios = require('axios')
require('dotenv').config()

const getToken = async (code) => {
  const result = await axios.post(
    'https://accounts.spotify.com/api/token',
    {
      code,
      redirect_uri: process.env.BASE_URL + '/callback',
      grant_type: 'authorization_code',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          btoa(`${process.env.SP_CLIENT_ID}:${process.env.SP_CLIENT_PASSWORD}`),
      },
    }
  )
  return result.data
}

const refreshToken = async (refresh_token) => {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token,
    client_id: process.env.SP_CLIENT_ID,
  })

  const response = await axios.post(
    `https://accounts.spotify.com/api/token?${params}`,
    null,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          btoa(`${process.env.SP_CLIENT_ID}:${process.env.SP_CLIENT_PASSWORD}`),
      },
    }
  )
  return response.data.access_token
}

module.exports = { refreshToken, getToken }
