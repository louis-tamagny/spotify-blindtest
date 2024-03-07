/* eslint-disable react/prop-types */
import spotifyService from '../services/spotify'
import { useNavigate } from 'react-router-dom'

const Playlist = ({ playlist }) => {
  const navigate = useNavigate()
  const handlePlayPlaylist = async (event) => {
    event.preventDefault()
    await spotifyService.playPlaylist(playlist.uri)
    navigate('/game')
  }

  return (
    <div className="playlistCard">
      <img
        className="playlistImg"
        src={playlist.images[0].url}
        alt={playlist.name}
      />
      <div className="playlistText">
        <p>{playlist.name}</p>
        <button
          className="playlistButton"
          onClick={(event) => handlePlayPlaylist(event)}>
          PLAY
        </button>
      </div>
    </div>
  )
}

const PlaylistList = ({ playlists }) => {
  return (
    <div className="playlistList">
      {playlists.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  )
}

export default PlaylistList
