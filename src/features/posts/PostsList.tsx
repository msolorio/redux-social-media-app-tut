import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { PostType } from '../../app/store'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '../../components/Spinner'

interface Props {
  post: PostType
}

const PostExcerpt = ({ post }: Props) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
      <p className="post-content">{post.content.substring(0, 100)} ...</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostsList = () => {
  const dispatch = useAppDispatch()
  const posts: PostType[] = useAppSelector(selectAllPosts)

  const postsStatus = useAppSelector(state => state.posts.status)
  const error = useAppSelector(state => state.posts.error)

  useEffect(() => {
    if (postsStatus !== 'idle') return

    dispatch(fetchPosts())
  }, [postsStatus, dispatch])

  const renderContent = () => {
    switch(postsStatus) {
      case 'loading':
        return <Spinner text="Loading..." />

      case 'succeeded':
        const orderedPosts = posts
          .slice()
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((post, idx) => {
            return <PostExcerpt key={idx} post={post} />
          })
        
        return <>{orderedPosts}</>

      case 'failed':
        return <>{error}</>

      default:
        return <></>
    }
  }




  return (
    <section className="posts list">
      <h2>Posts</h2>
      {renderContent()}
    </section>
  )
}