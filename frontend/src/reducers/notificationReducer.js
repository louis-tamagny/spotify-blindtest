import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    addNotif(state, { payload }) {
      state.push(payload)
    },
    removeNotif(state) {
      state.shift()
    },
  },
  selectors: {
    selectNotifications(state) {
      return state
    },
  },
})

export const newNotification = (notificationMessage) => {
  return async (dispatch) => {
    await dispatch(addNotif(notificationMessage))
    setTimeout(() => dispatch(removeNotif()), 5000)
  }
}

export const { addNotif, removeNotif } = notificationSlice.actions
export const { selectNotifications } = notificationSlice.selectors
export default notificationSlice.reducer
