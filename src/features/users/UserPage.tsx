import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'
import { selectUserById } from './usersSlice'
import { selectAllPosts } from '../posts/postsSlice'

interface Props {
  userId: string
}

export const UserPage = ({ match }: RouteComponentProps<Props>) => {

  const { userId } = match.params

  const user = useAppSelector((state) => selectUserById(state, userId))

  
  const postsForUser = useAppSelector(selectAllPosts)
  .filter(post => post.user === userId)
  
  const renderedPostTitles = postsForUser.map(post => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>
        {post.title}
      </Link>
    </li>
  ))
  
  if (!user) return <Redirect to="/users" />
  
  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{renderedPostTitles}</ul>
    </section>
  )
}
