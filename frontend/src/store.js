import { configureStore } from "@reduxjs/toolkit"
import gameReducer from "./reducers/gameReducer"

const store = configureStore({
  reducer: { game: gameReducer },
})

store.subscribe(() => console.log(store.getState()))

export default store
