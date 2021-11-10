import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { PostType } from '../../app/store'

const initialState = [
  { id: '1', title: 'First post', content: 'Welcome to my very first post', user: '0' },
  { id: '2', title: 'Second post', content: 'This is my second post', user: '0' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostType>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId
          }
        }
      }
    },

    postUpdated(state, action: PayloadAction<PostType>) {
      const { id, title, content } = action.payload
      const foundPost = state.find(post => post.id === id)
      
      if (foundPost) {
        foundPost.title = title
        foundPost.content = content
      }
    }
  }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer
