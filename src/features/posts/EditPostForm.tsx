import React, { useState, ChangeEvent } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { postUpdated, selectPostById } from './postsSlice'
import { RootState, PostType } from '../../app/store'

interface Props {
  postId: string
}

export const EditPostForm = (props: RouteComponentProps<Props>) => {
  const dispatch = useAppDispatch()
  
  const { postId } = props.match.params
  
  const post: PostType | undefined = useAppSelector((state) => {
    return selectPostById(state, postId)
  })

  
  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)
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
      content
    }))

    setRedirect(true)
  }

  if (!post) return <Redirect to="/" />
  
  if (redirect) return <Redirect to={`/posts/${post.id}`} />

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