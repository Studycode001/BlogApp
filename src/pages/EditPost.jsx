import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Container, PostForm } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { configurePost } from '../store/postSlice'

const EditPost = () => {
    const data = useSelector((state) => state.post.data)
    const dispatch = useDispatch();
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    dispatch(configurePost(post))
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return data ? (
        <div className="py-8">
            <Container>
                <PostForm post={data} />
            </Container>
        </div>
    ) : null
}

export default EditPost