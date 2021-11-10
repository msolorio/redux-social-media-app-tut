import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Chris Anthony' },
  { id: '1', name: 'Steve Fambro' },
  { id: '2', name: 'Javier Longillo' }
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default usersSlice.reducer
