import { createSlice } from '@reduxjs/toolkit'
import spotifyService from '../services/spotify'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    score: 0,
    trackCounter: 0,
    artists: [],
    tracks: [],
    years: [],
    currentTrack: {},
    parameters: {},
    displayState: 1,
  },
  reducers: {
    updateArtists(state, { payload }) {
      state.artists = payload
    },
    updateTracks(state, { payload }) {
      state.tracks = payload
    },
    updateYears(state, { payload }) {
      state.years = payload
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
    updateParameters(state, { payload }) {
      state.parameters = payload
    },
    clearScore(state) {
      state.score = 0
    },
    resetDisplayState(state) {
      state.displayState = 1
    },
    nextDisplayState(state) {
      switch (state.displayState) {
        case 0:
          if (state.parameters.artist) {
            state.displayState = 1
            break
          }
        // falls through
        case 1:
          if (state.parameters.track) {
            state.displayState = 2
            break
          }
        // falls through
        case 2:
          if (state.parameters.year) {
            state.displayState = 3
            break
          }
        // falls through
        default:
          state.displayState = 4
          break
      }
    },
    clear(state) {
      state.score = 0
      state.currentTrack = {}
      state.trackCounter = 0
      state.tracks = []
      state.artists = []
      state.parameters = {}
      state.years = []
      state.displayState = 1
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
    selectParameters(state) {
      return state.parameters
    },
    selectYears(state) {
      return state.years
    },
    selectDisplayState(state) {
      return state.displayState
    },
  },
})

export const {
  updateArtists,
  updateCurrentTrack,
  updateTracks,
  updateYears,
  incrementCounter,
  clearCounter,
  incrementScore,
  updateParameters,
  clearScore,
  resetDisplayState,
  nextDisplayState,
  clear,
} = gameSlice.actions

export const {
  selectArtists,
  selectCurrentTrack,
  selectScore,
  selectTrackCounter,
  selectTracks,
  selectParameters,
  selectYears,
  selectDisplayState,
} = gameSlice.selectors

export const goToNextTrack = () => {
  return async (dispatch) => {
    dispatch(updateArtists([]))
    dispatch(updateTracks([]))
    dispatch(updateYears([]))
    dispatch(resetDisplayState())
    await spotifyService.playNext()
    setTimeout(async () => {
      const currentTrack = await spotifyService.getCurrent()
      dispatch(updateCurrentTrack(currentTrack))
    }, 500)
  }
}

export default gameSlice.reducer
