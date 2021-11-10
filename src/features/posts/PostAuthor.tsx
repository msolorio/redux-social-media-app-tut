import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

export const PostAuthor = ({ userId }: any) => {
  const author = useSelector((state: RootState) => {
    return state.users.find(user => user.id === userId)
  })

  return (
    <span>
      by {author?.name || 'Unknown Author'}
    </span>
  )
}
