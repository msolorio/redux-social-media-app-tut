import React, { useState, ChangeEvent } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { postUpdated } from './postsSlice'
import { RootState, PostType } from '../../app/store'

interface Props {
  postId: string
}

export const EditPostForm = (props: RouteComponentProps<Props>) => {
  const dispatch = useAppDispatch()
  
  const { postId } = props.match.params
  
  const post: PostType | undefined = useAppSelector((state: RootState) => {
    return state.posts.find((post: PostType) => post.id === postId)
  })

  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [redirect, setRedirect] = useState(false)
  
  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  
  const onContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }
  
  const onSavePostClick = () => {
    if (!title || !content) return;
    
    dispatch(postUpdated({
      id: postId,
      title,
      content,
      user: '0'
    }))

    setRedirect(true)
  }

  if (!post || redirect) return <Redirect to="/" />

  return (
    <section>
      <h2>Edit Post</h2>

      <form>

        <div>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            placeholder="Put post title here..."
            value={title}
            onChange={onTitleChange}
          />
        </div>

        <div>
          <label htmlFor="postContent">Post Title:</label>
          <textarea
            id="postContent"
            placeholder="Amazing content goes here..."
            value={content}
            onChange={onContentChange}
          />
        </div>

        <button type="button" onClick={onSavePostClick}>
          Save Edits
        </button>
      </form>
    </section>
  )
}