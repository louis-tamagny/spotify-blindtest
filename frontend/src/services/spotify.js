import axios from 'axios'

const baseUrl = 'http://localhost:3001/spotify'
const authorization = localStorage.getItem('loggedInUser')
  ? 'Bearer ' + JSON.parse(localStorage.getItem('loggedInUser')).access_token
  : null

const getUserPlaylists = async () => {
  const response = await axios.post(
    baseUrl,
    { action: 'getUserPlaylists' },
    { headers: { Authorization: authorization } }
  )
  return response.data
}

const getFeaturedPlaylists = async () => {
  const response = await axios.post(
    baseUrl,
    { action: 'getFeaturedPlaylists' },
    { headers: { Authorization: authorization } }
  )
  return response.data
}

const getPlaylistsByCategory = async (category) => {
  const response = await axios.post(
    baseUrl,
    { action: 'getPlaylistsByCategory', payload: category },
    { headers: { Authorization: authorization } }
  )
  return response.data
}

const getCurrent = async () => {
  const response = await axios.post(
    baseUrl,
    { action: 'getCurrent' },
    { headers: { Authorization: authorization } }
  )
  return response.data
}

const playPlaylist = async (playlistUri) => {
  const response = await axios.post(
    baseUrl,
    { action: 'playPlaylist', payload: playlistUri },
    { headers: { Authorization: authorization } }
  )
  return response.data
}

const getQueue = async () => {
  const response = await axios.post(
    baseUrl,
    { action: 'getQueue' },
    { headers: { Authorization: authorization } }
  )
  return response.data
}

const getRelatedArtists = async (artistId) => {
  const response = await axios.post(
    baseUrl,
    { action: 'getRelatedArtists', payload: artistId },
    { headers: { Authorization: authorization } }
  )
  return response.data
}

const pause = async () => {
  const response = await axios.post(
    baseUrl,
    { action: 'pause' },
    { headers: { Authorization: authorization } }
  )
  return response.data
}

const playNext = async () => {
  const response = await axios.post(
    baseUrl,
    { action: 'playNext' },
    { headers: { Authorization: authorization } }
  )
  return response.data
}

const getRelatedTracks = async (track) => {
  const response = await axios.post(
    baseUrl,
    { action: 'getRelatedTracks', payload: track },
    { headers: { Authorization: authorization } }
  )
  return response.data
}

export default {
  getUserPlaylists,
  playPlaylist,
  getFeaturedPlaylists,
  getPlaylistsByCategory,
  pause,
  getRelatedArtists,
  getCurrent,
  playNext,
  getRelatedTracks,
  getQueue,
}
