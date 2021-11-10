import React from 'react'
import { PostType, ReactionType } from '../../app/store'
import { useAppDispatch } from '../../app/hooks'
import { reactionIncremented } from './postsSlice'

const reactionEmojis = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '♥️',
  rocket: '🚀',
  eyes: '👀'
}

export const ReactionButtons = ({ post }: Props) => {
  const dispatch = useAppDispatch()

  const handleReactionClick = (reactionName: ReactionType) => {
    dispatch(reactionIncremented({
      postId: post.id,
      reaction: reactionName
    }))
  }

  // loops through reactions obj creating array of reaction buttons
  // each displaying emoji and count for specific post
  const reactButtons = Object.entries(reactionEmojis).map((keyValue) => {
    const reactionName = keyValue[0] as ReactionType
    const emoji = keyValue[1]

    return (
      <button 
        key={reactionName} 
        type="button" 
        className="muted-button reaction-button"
        onClick={() => handleReactionClick(reactionName)}
      >
        {emoji} {post.reactions[reactionName]}
      </button>
    )
  })
  
  return (
    <div>
      {reactButtons}
    </div>
  )
}

interface Props {
  post: PostType
}
