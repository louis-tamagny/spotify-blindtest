import config from '../config'

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

export { handleLogin, handleLogout }
