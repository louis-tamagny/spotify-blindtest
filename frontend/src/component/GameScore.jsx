import { useSelector } from 'react-redux'
import {
  selectParameters,
  selectScore,
  selectTrackCounter,
} from '../reducers/gameReducer'
import { Col, Row } from 'react-bootstrap'

const GameScore = () => {
  const parameters = useSelector(selectParameters)
  const score = useSelector(selectScore)
  const counter = useSelector(selectTrackCounter)
  const multiplier =
    (parameters.artist ? 1 : 0) +
    (parameters.track ? 1 : 0) +
    (parameters.year ? 1 : 0)

  return (
    <Row className='scoreRow justify-content-xs-evenly'>
      <Col className='col-xs-auto justify-content-xs-center'>
        {score} bonnes réponses sur {counter * multiplier}
      </Col>
      <Col className='col-xs-auto justify-content-xs-center'>
        Taux de réussite: {(score / (counter * multiplier)) * 100}%
      </Col>
      <Col className='col-xs-auto justify-content-xs-center'>
        {parameters.turns - counter} tours restants
      </Col>
    </Row>
  )
}

export default GameScore
