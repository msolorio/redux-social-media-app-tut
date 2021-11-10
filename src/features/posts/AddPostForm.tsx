import React, { useState, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { postAdded } from './postsSlice'
import { RootState } from '../../app/store'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const canSave = title && content && userId

  const dispatch = useAppDispatch()

  const users = useAppSelector((state: RootState) => state.users)

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const onContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const onAuthorChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value)
  }

  const onSavePostClicked = () => {
    if (!canSave) return

    const reactions = {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0
    }

    dispatch(postAdded(title, content, userId, reactions))

    setTitle('')
    setContent('')
  }

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <div>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text" 
            id="postTitle"
            value={title}
            onChange={onTitleChange}
          />
        </div>

        <div>
          <label htmlFor="postAuthor">Author:</label>
          <select
            id="postAuthor" 
            value={userId}
            onChange={onAuthorChanged}
          >
            <option value="">--</option>
            {usersOptions}
          </select>
        </div>

        <div>
          <label htmlFor="postContent">Post Content:</label>
          <textarea
            id="postContent"
            value={content}
            onChange={onContentChange}
          />
        </div>

        <button 
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
            Save Post
          </button>
      </form>
    </section>
  )
}