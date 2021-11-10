import React, { useState, ChangeEvent } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { nanoid } from '@reduxjs/toolkit'
import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useAppDispatch()

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const onContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const onSavePostClicked = () => {
    if (!title || !content) return

    const newPost = {
      id: nanoid(),
      title,
      content
    }

    dispatch(postAdded(newPost))

    setTitle('')
    setContent('')
  }

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
        >
            Save Post
          </button>
      </form>
    </section>
  )
}