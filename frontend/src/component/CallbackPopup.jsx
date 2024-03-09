import { useEffect } from 'react'
import axios from 'axios'
import config from '../config'

const askForToken = async (code) => {
  console.log(code)
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
    <div>
      <p>Callback popup</p>
    </div>
  )
}

export default CallbackPopup
