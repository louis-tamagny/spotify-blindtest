import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './reducers/gameReducer'
import errorReducer from './reducers/errorReducer'

const store = configureStore({
  reducer: { game: gameReducer, error: errorReducer },
})

store.subscribe(() => console.log(store.getState()))

export default store
