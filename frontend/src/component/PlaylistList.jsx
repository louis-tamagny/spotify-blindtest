/* eslint-disable react/prop-types */
import spotifyService from "../services/spotify"
import { useNavigate } from "react-router-dom"

const Playlist = ({ playlist }) => {
  const navigate = useNavigate()
  const handlePlayPlaylist = () => {
    spotifyService.playPlaylist(playlist.uri)
    navigate("/game")
  }

  return (
    <div className="playlistBox">
      <img
        className="playlistImg"
        src={playlist.images[0].url}
        alt={playlist.name}
        onClick={handlePlayPlaylist}
      />
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
