import React from 'react'
import { useAppSelector } from '../../app/hooks'

interface Props {
  userId: string
}

export const PostAuthor = ({ userId }: Props) => {
  const author = useAppSelector((state) => {
    return state.users.find(user => user.id === userId)
  })

  return (
    <span>
      by {author?.name || 'Unknown Author'}
    </span>
  )
}
