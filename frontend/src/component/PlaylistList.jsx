/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import spotifyService from '../services/spotify'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

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

const PlaylistList = () => {
  const playlistParam = useParams().playlistParam
  const [playlists, setPlaylists] = useState([])

  console.log(playlistParam)

  const getUserPlaylists = async () => {
    const newPlaylists = await spotifyService.getUserPlaylists()
    setPlaylists(newPlaylists)
  }

  const getFeaturedPlaylists = async () => {
    const newPlaylists = await spotifyService.getFeaturedPlaylists()
    setPlaylists(newPlaylists)
  }

  const getCategoryPlaylists = async (category) => {
    const newPlaylists = await spotifyService.getPlaylistsByCategory(category)
    setPlaylists(newPlaylists)
  }

  useEffect(() => {
    switch (playlistParam) {
      case 'user':
        getUserPlaylists()
        break
      case 'featured':
        getFeaturedPlaylists()
        break
      default:
        getCategoryPlaylists(playlistParam)
        break
    }
  }, [playlistParam])

  if (playlists.length === 0) {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div className="playlistList">
      {playlists.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  )
}

export default PlaylistList
