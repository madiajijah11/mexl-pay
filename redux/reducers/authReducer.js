import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      return initialState
    },
    setToken: (state, action) => {
      state.token = action.payload
    }
  },
  extraReducers: builder => {}
})

export const { logout, setToken } = authSlice.actions

export default authSlice.reducer
