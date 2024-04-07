import { useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom';

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])

  return (
    !loading ? (
      <div className='flex min-h-screen flex-wrap content-between bg-gray-400'>
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    ) : null
  )
}

export default App
