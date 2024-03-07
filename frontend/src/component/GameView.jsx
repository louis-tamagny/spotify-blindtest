import { useState } from "react"
import Container from "react-bootstrap/Container"
import { Row, Col, Button, ProgressBar } from "react-bootstrap"
import GameAnswers from "./GameAnswers"
import { useDispatch, useSelector } from "react-redux"
import {
  clear,
  incrementScore,
  selectArtists,
  selectCurrentTrack,
  selectScore,
  selectTrackCounter,
  selectTracks,
  goToNextTrack,
} from "../reducers/gameReducer"

const GameView = () => {
  const artists = useSelector(selectArtists)
  const tracks = useSelector(selectTracks)
  const track = useSelector(selectCurrentTrack)
  const [message, setMessage] = useState("")
  const score = useSelector(selectScore)
  const counter = useSelector(selectTrackCounter)
  const [displayArtists, setDisplayArtists] = useState(true)
  const dispatch = useDispatch()

  const startGame = (event) => {
    event.preventDefault()
    document.getElementById("start-button").style.display = "none"
    nextTrack()
  }

  const endGame = () => {
    document.getElementById("start-button").style.display = ""
    setMessage(`Vous avez ${score} points sur 20`)
    dispatch(clear())
  }

  const nextTrack = async () => {
    dispatch(goToNextTrack())
    setDisplayArtists(true)
  }

  const handleArtistChoice = (event) => {
    event.preventDefault()
    if (event.target.value === track.artists[0].id) {
      dispatch(incrementScore())
      setDisplayArtists(false)
    } else {
      setMessage("Mince, c'est perdu !")
      nextTrack()
    }
  }

  const handleTrackChoice = (event) => {
    event.preventDefault()
    if (event.target.value === track.id) {
      setMessage("Bravo !")
      dispatch(incrementScore())
    }
    if (counter > 9) {
      endGame()
    } else {
      nextTrack()
    }
  }

  return (
    <Container>
      <Row>
        <Button id="start-button" onClick={(e) => startGame(e)}>
          Start Game
        </Button>
      </Row>
      {artists.length > 0 && displayArtists ? (
        <GameAnswers list={artists} handleChoice={handleArtistChoice} />
      ) : (
        <GameAnswers list={tracks} handleChoice={handleTrackChoice} />
      )}
      <Row>
        <Col style={{ textAlign: "center" }}>
          {score}/{counter * 2}
        </Col>
      </Row>
      <Row>
        <ProgressBar now={50} />
      </Row>
    </Container>
  )
}

export default GameView
