import React from 'react'
import Home from './Home/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Courses from './Courses/Courses'
import Singup from './Compontents/Singup'
import {Toaster} from 'react-hot-toast';
import { useAuth } from './Context/Authentication'
import Contact from './Compontents/Contact'
import About from './Compontents/About'

const App = () => {
  const [authUser,setAuthUser]=useAuth()
    console.log(authUser);
  return (
    <>
      <div className='dark:bg-slate-900 dark:text-white'>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/course' 
          element={authUser?<Courses/> : <Navigate to="/singup"/>}/>
          <Route path='/singup' element={<Singup/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
        <Toaster/>
      </BrowserRouter>
      </div>


    </>
  )
}

export default App
