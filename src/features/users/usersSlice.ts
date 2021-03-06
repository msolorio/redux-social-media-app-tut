import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { RootState } from '../../app/store'

interface UserType {
  id: string
  name: string
}

const initialState: UserType[] = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload
      })
  }
})

export const selectAllUsers = (state: RootState) => state.users

export const selectUserById = (state: RootState, userId: string) => {
  return state.users.find(user => user.id === userId)
}

export default usersSlice.reducer
