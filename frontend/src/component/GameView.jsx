import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'
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

const GameView = () => {
  const artists = useSelector(selectArtists)
  const years = useSelector(selectYears)
  const currentTrack = useSelector(selectCurrentTrack)
  const tracks = useSelector(selectTracks)
  const score = useSelector(selectScore)
  const counter = useSelector(selectTrackCounter)
  const parameters = useSelector(selectParameters)
  const [displayState, setDisplayState] = useState('')
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
    if (displayState === 'start') {
      changeDisplayState()
    }
  }, [displayState])

  const changeDisplayState = () => {
    switch (displayState) {
      case 'start':
        if (parameters.artist) {
          setDisplayState('artist')
          break
        }
      // falls through
      case 'artist':
        if (parameters.track) {
          setDisplayState('track')
          break
        }
      // falls through
      case 'track':
        if (parameters.year) {
          setDisplayState('year')
          break
        }
      // falls through
      default:
        nextTrack()
        setDisplayState('start')
        break
    }
  }

  const startGame = (params) => {
    nextTrack()
    document.getElementById('game-form').style.display = 'none'
    dispatch(updateParameters(params))
    setDisplayState('start')
  }

  const endGame = () => {
    document.getElementById('start-button').style.display = ''
    dispatch(clear())
  }

  const nextTrack = async () => {
    dispatch(goToNextTrack())
  }

  const handleArtistChoice = (event) => {
    event.preventDefault()
    if (event.target.value === currentTrack.artists[0].id) {
      dispatch(incrementScore())
    }
    changeDisplayState()
  }

  const handleTrackChoice = (event) => {
    event.preventDefault()
    if (event.target.value === currentTrack.id) {
      dispatch(incrementScore())
    }
    changeDisplayState()
  }

  const handleYearChoice = (event) => {
    event.preventDefault()
    if (event.target.value === currentTrack.album.release_date) {
      dispatch(incrementScore())
    }
    changeDisplayState()
  }

  return (
    <Container id='game-screen'>
      <GameForm startGame={startGame} />
      <Row className='justify-content-md-center'>
        <Col md='auto'>
          <h2>Answers</h2>
        </Col>
      </Row>
      {displayState === 'artist' && artists.length > 0 && (
        <GameAnswers
          list={artists}
          handleChoice={handleArtistChoice}
        />
      )}
      {displayState === 'track' && tracks.length > 0 && (
        <GameAnswers
          list={tracks}
          handleChoice={handleTrackChoice}
        />
      )}
      {displayState === 'year' && years.length > 0 && (
        <GameAnswers
          list={years}
          handleChoice={handleYearChoice}
        />
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

/*  methods to fetch and compute the answers for the game to display


setTimeout(async () => {
      const currentTrack = await spotifyService.getCurrent()
      dispatch(updateCurrentTrack(currentTrack))


      const tracks = await spotifyService.getRelatedTracks(currentTrack)
      dispatch(
        updateTracks(
          tracks
            .concat(currentTrack)
            .toSorted((a, b) =>
              a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            )
            .map((t) => {
              return { name: t.name, id: t.id }
            })
        )
      )
    }, 500)
    dispatch(incrementCounter())
    */
