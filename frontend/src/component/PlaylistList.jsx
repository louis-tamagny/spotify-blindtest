/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import spotifyService from '../services/spotify'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { useDispatch } from 'react-redux'
import { newNotification } from '../reducers/notificationReducer'

const Playlist = ({ playlist }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlePlayPlaylist = async (event) => {
    event.preventDefault()
    try {
      await spotifyService.playPlaylist(playlist.uri)
      await spotifyService.pause()
    } catch (error) {
      console.log(error)
      if (error.response.status === 404) {
        dispatch(
          newNotification(
            'The Spotify application is not running. Please start a listening session'
          )
        )
      } else {
        dispatch(newNotification(error.message))
      }
    }

    navigate('/game')
  }

  return (
    <div className='playlistCard'>
      <img
        className='playlistImg'
        src={playlist.images[0].url}
        alt={playlist.name}
      />
      <div className='playlistText'>
        <p>{playlist.name}</p>
        <button
          className='playlistButton'
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
  const dispatch = useDispatch()

  const getUserPlaylists = async () => {
    try {
      const newPlaylists = await spotifyService.getUserPlaylists()
      setPlaylists(newPlaylists)
    } catch (error) {
      dispatch(newNotification(error.message + '. Please try again !'))
    }
  }

  const getFeaturedPlaylists = async () => {
    try {
      const newPlaylists = await spotifyService.getFeaturedPlaylists()
      setPlaylists(newPlaylists)
    } catch (error) {
      dispatch(newNotification(error.message + '. Please try again !'))
    }
  }

  const getCategoryPlaylists = async (category) => {
    try {
      const newPlaylists = await spotifyService.getPlaylistsByCategory(category)
      setPlaylists(newPlaylists)
    } catch (error) {
      dispatch(newNotification(error.message + '. Please try again !'))
    }
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
  }, [playlistParam, dispatch])

  if (!playlists || playlists.length === 0) {
    return (
      <div>
        <Spinner
          animation='border'
          role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div className='playlistList'>
      {playlists.map((playlist) => (
        <Playlist
          key={playlist.id}
          playlist={playlist}
        />
      ))}
    </div>
  )
}

export default PlaylistList
