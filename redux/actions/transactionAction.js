import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../helpers/http'

export const transfer = createAsyncThunk(
  'transactions/transfer',
  async ({ ...transactionData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const { data } = await http(auth.token).post('/transactions/transfer', {
        ...transactionData
      })
      return data.results
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
