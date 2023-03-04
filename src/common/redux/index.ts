import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/auth.slice'

const reducer = combineReducers({
  auth: authSlice,
})

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  reducer,
})

export default store
