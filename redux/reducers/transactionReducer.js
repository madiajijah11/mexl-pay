import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  recipientId: '',
  amount: '',
  notes: '',
  pin: ''
}

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    chooseRecipient: (state, action) => {
      const { recipientId } = action.payload
      state = {
        ...state,
        ...{ recipientId }
      }
      return state
    },
    chooseAmount: (state, action) => {
      const { amount, notes } = action.payload
      state = {
        ...state,
        ...{ amount, notes }
      }
      return state
    },
    confirmPin: (state, action) => {
      const { pin } = action.payload
      state = {
        ...state,
        ...{ pin }
      }
      return state
    }
  },
  extraReducers: build => {}
})

export const { chooseAmount, chooseRecipient, confirmPin } =
  transactionSlice.actions

export default transactionSlice.reducer
