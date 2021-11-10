import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer
  },
})

// returns type / shape of state
export type RootState = ReturnType<typeof store.getState>

// returns type / shape of dispatch
export type AppDispatch = typeof store.dispatch

export interface PostType {
  id: string,
  title: string,
  content: string,
  user: string
}

export default store
