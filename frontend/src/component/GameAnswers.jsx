/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { incrementScore, selectCurrentTrack } from '../reducers/gameReducer'

const GameAnswers = ({ listName, list, changeDisplayState }) => {
  const [clicked, setClicked] = useState(null)
  const currentTrack = useSelector(selectCurrentTrack)
  const dispatch = useDispatch()
  let handleChoice = (event) => {
    event.preventDefault()
    throw new Error('wrong list name')
  }

  switch (listName) {
    case 'artists':
      handleChoice = (event) => {
        event.preventDefault()
        if (event.target.value === currentTrack.artists[0].id) {
          dispatch(incrementScore())
        }
        changeDisplayState()
      }
      break
    case 'tracks':
      handleChoice = (event) => {
        event.preventDefault()
        if (event.target.value === currentTrack.id) {
          dispatch(incrementScore())
        }
        changeDisplayState()
      }
      break
    case 'years':
      handleChoice = (event) => {
        event.preventDefault()
        if (event.target.value === currentTrack.album.release_date) {
          dispatch(incrementScore())
        }
        changeDisplayState()
      }
      break

    default:
      break
  }

  const testAnswer = (test) => {
    switch (listName) {
      case 'artists':
        return test === currentTrack.artists[0].id
      case 'tracks':
        return test === currentTrack.id
      case 'years':
        return test === Number(currentTrack.album.release_date.slice(0, 4))
      default:
        break
    }
  }

  return (
    <Row style={{ padding: '1em', gap: '10px' }}>
      {list.map((item) => (
        <Col key={item.id}>
          <Button
            disabled={clicked}
            variant={
              clicked
                ? testAnswer(item.id)
                  ? 'success'
                  : item.id === clicked
                  ? 'danger'
                  : 'secondary'
                : 'primary'
            }
            style={{ width: '100%', height: '100%' }}
            value={item.id}
            onClick={(e) => {
              handleChoice(e)
              setClicked(item.id)
            }}>
            {item.name}
          </Button>
        </Col>
      ))}
    </Row>
  )
}

export default GameAnswers
