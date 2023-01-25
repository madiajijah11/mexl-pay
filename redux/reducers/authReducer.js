import { createSlice } from '@reduxjs/toolkit'
import { setCookie } from 'cookies-next'

const initialState = {
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token = null
      setCookie('token', null)
    },
    setToken: (state, action) => {
      state.token = action.payload
      setCookie('token', action.payload)
    }
  },
  extraReducers: builder => {}
})

export const { logout, setToken } = authSlice.actions

export default authSlice.reducer
