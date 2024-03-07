import { createSlice } from "@reduxjs/toolkit"
import spotifyService from "../services/spotify"

const gameSlice = createSlice({
  name: "game",
  initialState: {
    score: 0,
    trackCounter: 0,
    artists: [],
    tracks: [],
    currentTrack: {},
  },
  reducers: {
    updateArtists(state, { payload }) {
      state.artists = payload
    },
    updateTracks(state, { payload }) {
      state.tracks = payload
    },
    updateCurrentTrack(state, { payload }) {
      state.currentTrack = payload
    },
    incrementCounter(state) {
      state.trackCounter++
    },
    clearCounter(state) {
      state.trackCounter = 0
    },
    incrementScore(state) {
      state.score++
    },
    clearScore(state) {
      state.score = 0
    },
    clear(state) {
      state.score = 0
      state.currentTrack = {}
      state.trackCounter = 0
      state.tracks = []
      state.artists = []
    },
  },
  selectors: {
    selectArtists(state) {
      return state.artists
    },
    selectTracks(state) {
      return state.tracks
    },
    selectCurrentTrack(state) {
      return state.currentTrack
    },
    selectScore(state) {
      return state.score
    },
    selectTrackCounter(state) {
      return state.trackCounter
    },
  },
})

export const {
  updateArtists,
  updateCurrentTrack,
  updateTracks,
  incrementCounter,
  clearCounter,
  incrementScore,
  clearScore,
  clear,
} = gameSlice.actions

export const {
  selectArtists,
  selectCurrentTrack,
  selectScore,
  selectTrackCounter,
  selectTracks,
} = gameSlice.selectors

export const goToNextTrack = () => {
  return async (dispatch) => {
    dispatch(updateArtists([]))
    dispatch(updateTracks([]))
    await spotifyService.playNext()

    setTimeout(async () => {
      const currentTrack = await spotifyService.getCurrent()
      dispatch(updateCurrentTrack(currentTrack))
      const artists = await spotifyService.getRelatedArtists(
        currentTrack.artists[0].id
      )
      dispatch(
        updateArtists(
          artists
            .slice(0, 4)
            .concat(currentTrack.artists[0])
            .toSorted((a, b) =>
              a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            )
            .map((a) => {
              return { name: a.name, id: a.id }
            })
        )
      )
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
    }, 500)
    dispatch(incrementCounter())
  }
}

export default gameSlice.reducer