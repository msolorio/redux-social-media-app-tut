import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { PostType, ReactionEmojis, ReactionType  } from '../../app/store'

const initialState = [
  {
    id: '1',
    title: 'First post',
    content: 'Welcome to my very first post',
    user: '0',
    date: '2021-11-10T18:30:56.104Z',
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0
    }
  },
  {
    id: '2',
    title: 'Second post',
    content: 'This is my second post',
    user: '1',
    date: '2021-11-10T18:28:56.104Z',
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0
    }
  },
]


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostType>) {
        state.push(action.payload)
      },
      // prepare will take in arguments to postAdded action creator call
      // and return a payload to be sent to reducer
      prepare(
        title: string,
        content: string,
        userId: string,
        reactions: ReactionEmojis
      ) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: reactions
          }
        }
      }
    },


    postUpdated(state, action: PayloadAction<PostUpdatedPayload>) {
      const { id, title, content } = action.payload
      const foundPost = state.find(post => post.id === id)
      
      if (foundPost) {
        foundPost.title = title
        foundPost.content = content
      }
    },


    reactionIncremented(state, action: PayloadAction<ReactionIncPayload>) {
      const postId = action.payload.postId
      const reaction = action.payload.reaction

      const post = state.find(post => post.id === postId)

      if (post) post.reactions[reaction]++
    }
  }
})


export const { postAdded, postUpdated, reactionIncremented } = postsSlice.actions

export default postsSlice.reducer


interface PostUpdatedPayload {
  id: string,
  title: string,
  content: string
}

interface ReactionIncPayload {
  postId: string,
  reaction: ReactionType
}
