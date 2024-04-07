import React from 'react'
import appwriteService from '../appwrite/config'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { configurePost } from '../store/postSlice'

const PostCard = ({$id,title,featuredimg}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log($id)

  const HandleClick = (slug) => {
    if(slug) {
        appwriteService.getPost(slug).then((post) => {
            if(post){
                dispatch(configurePost(post))
                console.log(post)
            }
            else navigate("/")
        })
    } else navigate('/');
  }

  return (
    <Link to={`/post/${$id}`} onClick={HandleClick($id)} >
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                {featuredimg && <img src={appwriteService.getFilePreview(featuredimg)} alt={title} className='rounded-xl' />}
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard