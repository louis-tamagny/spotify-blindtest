/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'
import GameAnswers from './GameAnswers'
import { useDispatch, useSelector } from 'react-redux'
import {
  clear,
  selectArtists,
  selectCurrentTrack,
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
import GameScore from './GameScore'

const GameView = () => {
  const artists = useSelector(selectArtists)
  const years = useSelector(selectYears)
  const currentTrack = useSelector(selectCurrentTrack)
  const tracks = useSelector(selectTracks)
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

      <Row className='justify-content-xs-evenly'>
        {displayState === 4 && (
          <Col
            className='col-xs-auto justify-content-xs-center'
            style={{ textAlign: 'center' }}>
            <button
              id='game-next-button'
              onClick={handleNextTrack}>
              {counter === parameters.turns ? 'End' : 'Next'}
            </button>
          </Col>
        )}
        {parameters.turns && (
          <Col
            className='col-xs-auto justify-content-xs-center'
            style={{ textAlign: 'center' }}>
            <button onClick={endGame}>Exit Game</button>
          </Col>
        )}
      </Row>
      {parameters.turns && parameters.score && <GameScore />}
    </Container>
  )
}

export default GameView
