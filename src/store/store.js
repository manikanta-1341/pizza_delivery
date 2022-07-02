import { configureStore } from '@reduxjs/toolkit'
import Slice from '../reducer/reducer'
export const store = configureStore({
  reducer: Slice.reducer,
})

export default store