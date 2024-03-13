import spotifyService from '../services/spotify'
import {
  updateArtists,
  updateTracks,
  updateYears,
} from '../reducers/gameReducer'

//Function to return 4 random items from an array
const shuffleArray = (array) => {
  const newArray = []
  while (newArray.length < 4 && newArray.length < array.length) {
    const i = Math.floor(Math.random() * array.length)
    if (!newArray.includes(i)) {
      newArray.push(i)
    }
  }
  return newArray.map((i) => {
    return array[i]
  })
}

export const fetchRelatedArtists = async (dispatch, currentTrack) => {
  const artists = await spotifyService.getRelatedArtists(
    currentTrack.artists[0].id
  )
  dispatch(
    updateArtists(
      shuffleArray(artists)
        .concat(currentTrack.artists[0])
        .toSorted((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        )
        .map((a) => {
          return { name: a.name, id: a.id }
        })
    )
  )
}

export const fetchRelatedTracks = async (dispatch, currentTrack) => {
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
}

export const setReleaseDates = (dispatch, currentTrack) => {
  const dateArray = [Number(currentTrack.album.release_date.slice(0, 4))]
  const trackIndex = Math.floor(Math.random() * 5)

  for (let i = 0; i < trackIndex; i++) {
    dateArray.unshift(dateArray[0] - Math.floor(Math.random() * 3 + 1))
  }
  for (let i = 4; i > trackIndex; i--) {
    dateArray.push(
      dateArray[dateArray.length - 1] + Math.floor(Math.random() * 3 + 1)
    )
  }
  dispatch(
    updateYears(
      dateArray.map((d, index) => {
        return { value: d, id: index }
      })
    )
  )
}
