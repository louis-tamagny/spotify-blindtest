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
    clear(state) {
      state.score = 0
      state.currentTrack = {}
      state.trackCounter = 0
      state.tracks = []
      state.artists = []
      state.parameters = {}
      state.years = []
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
} = gameSlice.selectors

export const goToNextTrack = () => {
  return async (dispatch) => {
    dispatch(updateArtists([]))
    dispatch(updateTracks([]))
    await spotifyService.playNext()
    setTimeout(async () => {
      const currentTrack = await spotifyService.getCurrent()
      dispatch(updateCurrentTrack(currentTrack))
    }, 500)
  }
}

export default gameSlice.reducer
