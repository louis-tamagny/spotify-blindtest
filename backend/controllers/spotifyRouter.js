const axios = require('axios')
const express = require('express')
const spotifyRouter = express.Router()

const baseUrl = 'https://api.spotify.com/v1/'

const getUserPlaylists = async (authorization) => {
  const response = await axios.get(baseUrl + 'me/playlists', {
    headers: { Authorization: authorization },
  })
  return response.data.items
}

const getFeaturedPlaylists = async (authorization) => {
  const response = await axios.get(baseUrl + 'browse/featured-playlists', {
    headers: { Authorization: authorization },
  })
  return response.data.playlists.items
}

const getPlaylistsByCategory = async (authorization, category) => {
  const response = await axios.get(
    `${baseUrl}browse/categories/${category}/playlists`,
    {
      headers: { Authorization: authorization },
    }
  )
  const returnedPlaylists = [
    ...new Map(
      response.data.playlists.items.map((playlist) => [playlist.id, playlist])
    ).values(),
  ]
  return returnedPlaylists
}

const getCurrent = async (authorization) => {
  let response
  response = await axios.get(`${baseUrl}me/player/currently-playing`, {
    headers: { Authorization: authorization },
  })
  return response.data.item
}

const playPlaylist = async (authorization, playlistUri) => {
  await axios.put(
    baseUrl + 'me/player/play',
    { context_uri: playlistUri, position_ms: 0 },
    {
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
    }
  )
}

const getQueue = async (authorization) => {
  const response = await axios.get(`${baseUrl}me/player/queue`, {
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

const getRelatedArtists = async (authorization, artistId) => {
  const response = await axios.get(
    `${baseUrl}artists/${artistId}/related-artists`,
    {
      headers: { Authorization: authorization },
    }
  )
  return response.data.artists
}

const pause = async (authorization) => {
  await axios.put(baseUrl + 'me/player/pause', null, {
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
  })
}

const playNext = async (authorization) => {
  await axios.post(`${baseUrl}me/player/next`, null, {
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
  })
}

const getRelatedTracks = async (authorization, track) => {
  const params = new URLSearchParams({
    limit: 4,
    seed_artists: track.artists[0].id,
    seed_tracks: track.id,
  }).toString()
  const response = await axios.get(`${baseUrl}recommendations?${params}`, {
    headers: { Authorization: authorization },
  })
  return response.data.tracks
}

spotifyRouter.post('', async (req, res, next) => {
  let result
  const authorization = req.headers.authorization
  const payload = req.body.payload
  switch (req.body.action) {
    case 'getUserPlaylists':
      result = await getUserPlaylists(authorization)
      break
    case 'getFeaturedPlaylists':
      result = await getFeaturedPlaylists(authorization)
      break
    case 'getPlaylistsByCategory':
      result = await getPlaylistsByCategory(authorization, payload)
      break
    case 'playPlaylist':
      result = await playPlaylist(authorization, payload)
      break
    case 'pause':
      result = await pause(authorization)
      break
    case 'getRelatedArtists':
      result = await getRelatedArtists(authorization, payload)
      break
    case 'getCurrent':
      result = await getCurrent(authorization)
      break
    case 'playNext':
      result = await playNext(authorization)
      break
    case 'getRelatedTracks':
      result = await getRelatedTracks(authorization, payload)
      break
    case 'getQueue':
      result = await getQueue(authorization)
      break

    default:
      res.status(404).end('invalid action name')
      return
  }
  res.status(200).json(result)
})

module.exports = spotifyRouter
