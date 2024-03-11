import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { askForToken } from '../services/login'

const CallbackPopup = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('code')) {
      askForToken(params.get('code'))
    }
  }, [])

  return (
    <Spinner
      animation='border'
      role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
}

export default CallbackPopup
