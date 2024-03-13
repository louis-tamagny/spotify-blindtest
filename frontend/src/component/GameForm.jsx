/* eslint-disable react/prop-types */
import { useState } from 'react'

const GameForm = ({ startGame }) => {
  const [artistP, setArtistP] = useState(true)
  const [trackP, setTrackP] = useState(true)
  const [yearP, setYearP] = useState(false)
  const [infiniteP, setInfiniteP] = useState(false)
  const [nbTurnP, setNbTurnP] = useState(10)
  const [scoreP, setScoreP] = useState(true)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const parameters = {
      artist: artistP,
      track: trackP,
      year: yearP,
      infinite: infiniteP,
      turns: nbTurnP,
      score: scoreP,
      scoreMax:
        (artistP ? nbTurnP : 0) +
        (trackP ? nbTurnP : 0) +
        (yearP ? nbTurnP : 0),
    }
    console.log(parameters)
    startGame(parameters)
  }

  return (
    <form
      onSubmit={handleSubmit}
      id='game-form'
      title='Game preferences'>
      <div>
        <b>Answer parameters</b>
        <label className='game-form-label'>
          Artist names
          <input
            type='checkbox'
            checked={artistP}
            onChange={() => setArtistP(!artistP)}
          />
        </label>
        <label className='game-form-label'>
          Song names
          <input
            type='checkbox'
            checked={trackP}
            onChange={() => setTrackP(!trackP)}
          />
        </label>
        <label className='game-form-label'>
          Release year
          <input
            type='checkbox'
            checked={yearP}
            onChange={() => setYearP(!yearP)}
          />
        </label>
      </div>
      <div>
        <b>Other parameters</b>
        <label className='game-form-label'>
          Infinite mode
          <input
            type='checkbox'
            checked={infiniteP}
            onChange={() => setInfiniteP(!infiniteP)}
          />
        </label>
        <label className='game-form-label'>
          Number of turns
          <input
            id='game-input-number'
            type='number'
            min={5}
            value={nbTurnP}
            onChange={({ target }) => setNbTurnP(Number(target.value))}
            max={100}
            disabled={infiniteP}
          />
        </label>
        <label className='game-form-label'>
          Display the score ?
          <input
            type='checkbox'
            checked={scoreP}
            onChange={() => setScoreP(!scoreP)}
          />
        </label>
      </div>
      <div>
        <button
          id='start-button'
          type='submit'>
          Start game
        </button>
      </div>
    </form>
  )
}

export default GameForm
