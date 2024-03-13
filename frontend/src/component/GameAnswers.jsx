/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { incrementScore, nextDisplayState } from '../reducers/gameReducer'

const GameAnswers = ({ list, goodAnswer }) => {
  const [clicked, setClicked] = useState(null)
  const dispatch = useDispatch()

  let handleChoice = (event) => {
    event.preventDefault()
    if (event.target.value === goodAnswer.value) {
      dispatch(incrementScore())
    }
    dispatch(nextDisplayState())
  }

  return (
    <Row style={{ padding: '1em', gap: '10px' }}>
      {list.map((item) => (
        <Col key={item.id}>
          <Button
            disabled={clicked}
            variant={
              clicked
                ? item.id === goodAnswer.id
                  ? 'success'
                  : item.id === clicked
                  ? 'danger'
                  : 'secondary'
                : 'primary'
            }
            style={{ width: '100%', height: '100%' }}
            value={item.value}
            onClick={(e) => {
              handleChoice(e)
              setClicked(item.id)
            }}>
            {item.value}
          </Button>
        </Col>
      ))}
    </Row>
  )
}

export default GameAnswers
