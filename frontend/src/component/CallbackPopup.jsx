import { useEffect } from 'react'
import axios from 'axios'
import config from '../utils/config'
import { Spinner } from 'react-bootstrap'

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

const CallbackPopup = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('code')) {
      askForToken(params.get('code'))
    }
  }, [])

  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default CallbackPopup
