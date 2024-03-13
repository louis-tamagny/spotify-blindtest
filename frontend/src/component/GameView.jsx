import { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'
import GameAnswers from './GameAnswers'
import { useDispatch, useSelector } from 'react-redux'
import {
  clear,
  selectArtists,
  selectCurrentTrack,
  selectScore,
  selectTrackCounter,
  selectTracks,
  goToNextTrack,
  selectParameters,
  updateParameters,
  selectYears,
  selectDisplayState,
  nextDisplayState,
} from '../reducers/gameReducer'
import GameForm from './GameForm'
import {
  fetchRelatedArtists,
  fetchRelatedTracks,
  setReleaseDates,
} from '../utils/game'
import spotifyService from '../services/spotify'

const GameView = () => {
  const artists = useSelector(selectArtists)
  const years = useSelector(selectYears)
  const currentTrack = useSelector(selectCurrentTrack)
  const tracks = useSelector(selectTracks)
  const score = useSelector(selectScore)
  const counter = useSelector(selectTrackCounter)
  const parameters = useSelector(selectParameters)
  const displayState = useSelector(selectDisplayState)
  const dispatch = useDispatch()

  useEffect(() => {
    if (parameters.artist && artists.length === 0) {
      fetchRelatedArtists(dispatch, currentTrack)
    }
    if (parameters.track && tracks.length === 0) {
      fetchRelatedTracks(dispatch, currentTrack)
    }
    if (parameters.year && years.length === 0) {
      setReleaseDates(dispatch, currentTrack)
    }
  }, [currentTrack])

  useEffect(() => {
    if (displayState === 0) {
      dispatch(nextDisplayState())
    }
  }, [displayState])

  const startGame = (params) => {
    dispatch(goToNextTrack())
    document.getElementById('game-form').style.display = 'none'
    dispatch(updateParameters(params))
  }

  const endGame = () => {
    document.getElementById('game-form').style.display = ''
    dispatch(clear())
    spotifyService.pause()
  }

  const handleNextTrack = (event) => {
    event.preventDefault()
    if (counter === parameters.turns) {
      endGame()
    } else {
      dispatch(goToNextTrack())
    }
  }

  return (
    <Container id='game-screen'>
      <Row className='justify-content-md-left'>
        <div>
          <button onClick={endGame}>End Game</button>
        </div>
      </Row>
      <Row>
        <GameForm startGame={startGame} />
      </Row>

      {displayState > 0 && artists.length > 0 && (
        <GameAnswers
          list={artists.map((item) => {
            return { id: item.id, value: item.name }
          })}
          goodAnswer={{
            id: currentTrack.artists[0].id,
            value: currentTrack.artists[0].name,
          }}
        />
      )}
      {displayState > 1 && tracks.length > 0 && (
        <GameAnswers
          list={tracks.map((item) => {
            return { id: item.id, value: item.name }
          })}
          goodAnswer={{
            id: currentTrack.id,
            value: currentTrack.name,
          }}
        />
      )}
      {displayState > 2 && years.length > 0 && (
        <GameAnswers
          list={years}
          goodAnswer={years.find(
            (y) =>
              y.value === Number(currentTrack.album.release_date.slice(0, 4))
          )}
        />
      )}
      {displayState === 4 && (
        <Row className='justify-content-md-center'>
          <Col className='col-md-auto'>
            <button
              id='game-next-button'
              onClick={handleNextTrack}>
              {counter === parameters.turns ? 'END' : 'NEXT'}
            </button>
          </Col>
        </Row>
      )}

      {parameters.infinite ? (
        <Col></Col>
      ) : (
        <Row>
          <Col style={{ textAlign: 'center' }}>
            {score} points sur {parameters.scoreMax}
          </Col>
          <Col style={{ textAlign: 'center' }}>
            {counter} tour sur {parameters.turns}
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default GameView
