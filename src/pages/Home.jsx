import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../appwrite/auth'
import authSlice, { login } from '../store/authSlice'
import { Allposts, configurePost } from '../store/postSlice'

const Home = () => {
    const authStatus = useSelector(state => state.auth.status)
    const dispatch = useDispatch()
    const userdata = async () => {
        const userData = await authService.getCurrentUser()
        if(userData){ 
            console.log(userData)
            dispatch(login(userData));
        }
    }

    useEffect(() => {
        userdata();
        appwriteService.getPosts().then((posts) => {
            if(posts) {
                dispatch(Allposts(posts.documents))
            }
        })
    }, [])

    const posts = useSelector((state) => state.post.posts)

    if(posts?.length === 0 || !authStatus) {
        return (
            <div className="w-full py-8 mt-4 text">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            {!authStatus ? <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to read posts
                            </h1> : <h1 className='text-2xl font-bold hover:text-gray-500'>
                                No posts
                            </h1>}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    {posts?.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home