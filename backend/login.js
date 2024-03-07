require('dotenv').config()

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
