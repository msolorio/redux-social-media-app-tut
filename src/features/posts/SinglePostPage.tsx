import React from 'react'
import { Redirect, Link, RouteComponentProps } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { PostType } from '../../app/store'
import { selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

interface Props {
  postId: string
}

export const SinglePostPage = (props: RouteComponentProps<Props>) => {
  const { postId } = props.match.params

  const post: PostType | undefined = useAppSelector((state) => {
    return selectPostById(state, postId)
  })

  if (!post) return <Redirect to="/" />
  
  return (
    <section>
      <article>
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user} />
        <TimeAgo />
        <p className="post-content">
          {post.content}
        </p>
        <ReactionButtons post={post} />
        <Link to={`/posts/${postId}/edit`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}

export default SinglePostPage
