import React, { useEffect, useState } from 'react'
import { useFetcher, useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {
  const params = useParams()

  const [post, setPost] = useState({});
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(params.id)
    setPost(response.data)
  })

  const [comments, setComments] = useState([]);
  const [fetchCommentsById, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(params.id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchPostById(params.id);
    fetchCommentsById(params.id)
  }, [])

  return (
    <div>
      <h1>you open the page of post with id = {params.id}</h1>
      {isLoading
        ? <Loader />
        : <div>{post.id}. {post.title}</div>}
      <div>
        <h3>Comments</h3>
        {comments.map(comm =>
          <div style={{ marginTop: 15 }} key={comm.id}>
            <h3>{comm.email}</h3>
            <div>{comm.body}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostIdPage
