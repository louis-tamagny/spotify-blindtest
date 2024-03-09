import { useSelector } from 'react-redux'
import { selectErrors } from '../reducers/errorReducer'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const errors = useSelector(selectErrors)
  return (
    <div>
      {errors.map((error, index) => 
        <Alert variant='warning' dismissible style={{textAlign: 'center'}} key={index}>{error}</Alert>
      )}
    </div>
  )
}

export default Notification
