import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { Row, Col, Button } from 'react-bootstrap'
import GameAnswers from './GameAnswers'
import { useDispatch, useSelector } from 'react-redux'
import {
  clear,
  incrementScore,
  selectArtists,
  selectCurrentTrack,
  selectScore,
  selectTrackCounter,
  selectTracks,
  goToNextTrack,
  selectParameters,
  updateParameters,
  selectYears,
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
  const [displayState, setDisplayState] = useState(4)
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
      changeDisplayState()
    }
  }, [displayState])

  const changeDisplayState = () => {
    switch (displayState) {
      case 0:
        if (parameters.artist) {
          setDisplayState(1)
          break
        }
      // falls through
      case 1:
        if (parameters.track) {
          setDisplayState(2)
          break
        }
      // falls through
      case 2:
        if (parameters.year) {
          setDisplayState(3)
          break
        }
      // falls through
      default:
        setDisplayState(4)
        break
    }
  }

  const startGame = (params) => {
    nextTrack()
    document.getElementById('game-form').style.display = 'none'
    dispatch(updateParameters(params))
    setDisplayState(0)
  }

  const endGame = () => {
    document.getElementById('game-form').style.display = ''
    dispatch(clear())
    spotifyService.pause()
    setDisplayState(0)
  }

  const nextTrack = async () => {
    dispatch(goToNextTrack())
  }

  const handleNextTrack = (event) => {
    event.preventDefault()
    nextTrack()
    setDisplayState(0)
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
          listName={'artists'}
          list={artists}
          changeDisplayState={changeDisplayState}
        />
      )}
      {displayState > 1 && tracks.length > 0 && (
        <GameAnswers
          listName={'tracks'}
          list={tracks}
          changeDisplayState={changeDisplayState}
        />
      )}
      {displayState > 2 && years.length > 0 && (
        <GameAnswers
          listName={'years'}
          list={years}
          changeDisplayState={changeDisplayState}
        />
      )}
      {displayState === 4 && (
        <Row className='justify-content-md-center'>
          <Col className='col-md-auto'>
            <button
              id='game-next-button'
              onClick={handleNextTrack}>
              NEXT
            </button>
          </Col>
        </Row>
      )}
      <Row>
        <Col style={{ textAlign: 'center' }}>
          {score} points sur {counter * 2}
        </Col>
      </Row>
    </Container>
  )
}

export default GameView
