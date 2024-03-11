import config from '../utils/config'
import axios from 'axios'

const askForToken = async (code) => {
  const loggedInUser = await axios.post(
    'http://localhost:3001/login/accesstoken',
    {
      code: code,
    }
  )
  window.localStorage.setItem(
    'loggedInUser',
    JSON.stringify({ ...loggedInUser.data, code })
  )
  location = `${config.BASE_URL}/selection`
}

const askForCode = async () => {
  const searchParams = new URLSearchParams({
    response_type: 'code',
    client_id: config.SP_CLIENT_ID,
    scope: config.SP_AUTH_SCOPE,
    redirect_uri: config.BASE_URL + '/callback',
    state: config.SP_AUTH_STATE,
  }).toString()

  location = 'https://accounts.spotify.com/authorize?' + searchParams
}

const refreshToken = async (refresh_token) => {
  const loggedInUser = await axios.post(
    'http://localhost:3001/login/refreshtoken',
    {
      refresh_token,
    }
  )
  window.localStorage.setItem(
    'loggedInUser',
    JSON.stringify({ ...loggedInUser.data })
  )
}

const handleLogin = (event) => {
  event.preventDefault()
  if (localStorage.getItem('loggedInUser') === null) {
    askForCode()
  }
}

const handleLogout = (event) => {
  event.preventDefault()
  window.localStorage.clear()
  location = `${config.BASE_URL}`
}

export { handleLogin, handleLogout, refreshToken, askForToken }
