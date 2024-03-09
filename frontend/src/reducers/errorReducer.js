import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
  name: 'error',
  initialState: [],
  reducers: {
    addError(state, { payload }) {
      state.push(payload)
    },
    removeError(state) {
      state.shift()
    },
  },
  selectors: {
    selectErrors(state) {
      return state
    },
  },
})

export const newError = (errorMessage) => {
  
  return async (dispatch) => {
    await dispatch(addError(errorMessage))
    setTimeout(() => dispatch(removeError()), 5000)
  }
}

export const { addError, removeError } = errorSlice.actions
export const { selectErrors } = errorSlice.selectors
export default errorSlice.reducer
