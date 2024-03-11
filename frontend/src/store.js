import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './reducers/gameReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: { game: gameReducer, notification: notificationReducer },
})

store.subscribe(() => console.log(store.getState()))

export default store
