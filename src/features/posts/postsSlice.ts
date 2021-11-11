import { createSlice, PayloadAction, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { PostType, ReactionEmojis, ReactionType, RootState  } from '../../app/store'
import { client } from '../../api/client'

// const initialState = [
//   {
//     id: '1',
//     title: 'First post',
//     content: 'Welcome to my very first post',
//     user: '0',
//     date: '2021-11-10T18:30:56.104Z',
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0
//     }
//   },
//   {
//     id: '2',
//     title: 'Second post',
//     content: 'This is my second post',
//     user: '1',
//     date: '2021-11-10T18:28:56.104Z',
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0
//     }
//   },
// ]

interface PostsStateType {
  posts: PostType[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

const initialState: PostsStateType = {
  posts: [],
  status: 'idle',
  error: null
}


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostType>) {
        state.posts.push(action.payload)
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
      const foundPost = state.posts.find(post => post.id === id)
      
      if (foundPost) {
        foundPost.title = title
        foundPost.content = content
      }
    },


    reactionIncremented(state, action: PayloadAction<ReactionIncPayload>) {
      const postId = action.payload.postId
      const reaction = action.payload.reaction

      const post = state.posts.find(post => post.id === postId)

      if (post) post.reactions[reaction]++
    }
  },

  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // console.log('action.payload after fetchPost fulfilled ==>', action.payload);
        
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  }
})

export const selectAllPosts = (state: RootState) => state.posts.posts

export const selectPostById = (state: RootState, postId: string) => {
  return state.posts.posts.find(post => post.id === postId)
}

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
