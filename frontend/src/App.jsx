import SelectionMenu from './component/SelectionMenu'
import GameView from './component/GameView'
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import config from './config'

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('code')) {
      askForToken(params.get('code'))
    }
  }, [])

  const askForCode = async () => {
    const searchParams = new URLSearchParams({
      response_type: 'code',
      client_id: config.SP_CLIENT_ID,
      scope: config.SP_AUTH_SCOPE,
      redirect_uri: config.BASE_URL,
      state: config.SP_AUTH_STATE,
    }).toString()

    location = 'https://accounts.spotify.com/authorize?' + searchParams
  }

  const askForToken = async (code) => {
    const loggedInUser = await axios.post('http://localhost:3001/login', {
      code: code,
    })
    window.localStorage.setItem(
      'loggedInUser',
      JSON.stringify({ ...loggedInUser.data, code })
    )
    location = `${config.BASE_URL}/selection`
  }

  const handleLogin = (event) => {
    event.preventDefault()
    if (localStorage.getItem('loggedInUser') === null) {
      askForCode()
    }
  }

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <button onClick={(event) => handleLogin(event)}>login</button>
          }
        />
        <Route path="/selection" element={<SelectionMenu />}></Route>
        <Route path="/game" element={<GameView />} />
      </Routes>
    </div>
  )
}

export default App
