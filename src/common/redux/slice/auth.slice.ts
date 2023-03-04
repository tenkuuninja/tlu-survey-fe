import { createSlice } from '@reduxjs/toolkit'

export interface Auth {
  user: any
  isAuthenticated: boolean
  isAuthenticating: boolean
}

const initialState: Auth = {
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthUser: (state: Auth, action: any) => {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isAuthenticating: false,
      }
    },
    removeAuth: (state) => {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isAuthenticating: false,
      }
    },
  },
})

export const { updateAuthUser, removeAuth } = AuthSlice.actions

export default AuthSlice.reducer
