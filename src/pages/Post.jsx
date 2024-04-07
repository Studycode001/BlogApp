import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components';
import { ID } from 'appwrite';
import  parse  from 'html-react-parser';
import { configurePost } from '../store/postSlice';

const Post = () => {
    const data = useSelector((state) => state.post.data)
    const { slug } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = data && userData ? data.userId === userData.$id : false;
    console.log(data)
    console.log(data.featuredimg)

    // useEffect(() => {
    //     if(slug) {
    //         appwriteService.getPost(slug).then((post) => {
    //             if(post){
    //                 dispatch(configurePost(post))
    //                 console.log(post)
    //             }
    //             else navigate("/")
    //         })
    //     } else navigate('/');
    // }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(data.$id).then((status) => {
            if(status) {
                appwriteService.deleteFile(data.featuredimg);
                navigate('/')
            }
        })
    }

    return data ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {data.featuredimg && <img 
                    src={appwriteService.getFilePreview(data.featuredimg)} 
                    alt={data.title}
                    className='rounded-xl' 
                    />}

                    {isAuthor && (
                        <div className="abosolute right-6 top-6">
                            <Link to={`/edit-post/${data.$id}`}>
                                <Button
                                bgColor="bg-red-500"
                                className="mr-3" >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                            bgColor="bg-red-500"
                            onClick={deletePost} >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{data.title}</h1>
                </div>
                {data?.content && <div className="browser-css">{parse(data.content)}</div>}
            </Container>
        </div>
    ) : null;
}

export default Post