import React, { useEffect, useMemo, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { Allposts } from '../store/postSlice'

const AllPost = () => {

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.post.posts)

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
        if(posts) {
            dispatch(Allposts(posts.documents))
        }
    })
  }, [posts])


  return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
          {posts ? (posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard post={post} />
            </div>
          ))): <h1 className='text-2xl font-bold hover:text-gray-500'>
              Add some Post
          </h1>}
        </div>
      </Container>
    </div>
  )
}

export default AllPost