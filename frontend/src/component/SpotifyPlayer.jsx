import "../spotifyPlayer"
import spotifyService from "../services/spotify"

const SpotifyPlayer = () => {
  const handleTransfer = (event) => {
    event.preventDefault()
    spotifyService.transferPlayback()
  }

  return (
    <button id="togglePlay" onClick={(e) => handleTransfer(e)}>
      Toggle Play
    </button>
  )
}

export default SpotifyPlayer
