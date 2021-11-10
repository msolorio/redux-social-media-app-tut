import React from 'react'
import { Redirect, Link, RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, PostType } from '../../app/store'

interface Props {
  postId: string | undefined
}

export const SinglePostPage = (props: RouteComponentProps<Props>) => {
  console.log('props ==>', props);
  

  const { postId } = props.match.params

  const post = useSelector((state: RootState) => {
    return state.posts.find((post: PostType) => post.id === postId)
  })

  if (!post) return <Redirect to="/" />

  return (
    <section>
      <article>
        <h2>{post.title}</h2>
        <p className="post-content">
          {post.content}
        </p>
        <Link to={`/posts/${postId}/edit`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}

export default SinglePostPage
