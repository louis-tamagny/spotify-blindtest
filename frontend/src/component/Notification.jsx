import { useSelector } from 'react-redux'
import { selectNotifications } from '../reducers/notificationReducer'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notifications = useSelector(selectNotifications)
  return (
    <div>
      {notifications.map((notification, index) => (
        <Alert
          variant='warning'
          dismissible
          style={{ textAlign: 'center', margin: '0px' }}
          key={index}>
          {notification}
        </Alert>
      ))}
    </div>
  )
}

export default Notification
