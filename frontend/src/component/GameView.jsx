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
          setDisplayState(displayState + 1)
          break
        }
      // falls through
      case 1:
        if (parameters.track) {
          setDisplayState(displayState + 1)
          break
        }
      // falls through
      case 2:
        if (parameters.year) {
          setDisplayState(displayState + 1)
          break
        }
      // falls through
      default:
        nextTrack()
        setDisplayState(0)
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
      {displayState > 0 && artists.length > 0 && (
        <GameAnswers
          list={artists}
          handleChoice={handleArtistChoice}
        />
      )}
      {displayState > 1 && tracks.length > 0 && (
        <GameAnswers
          list={tracks}
          handleChoice={handleTrackChoice}
        />
      )}
      {displayState > 2 && years.length > 0 && (
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
