import React from 'react'
import NavBar from '../Compontents/NavBar'
import Footer from '../Compontents/Footer'
import Course from '../Compontents/Course'

const Courses = () => {
  return (
    <>
      <NavBar/>
      <div className='min-h-screen dark:bg-slate-900 dark:text-white'>
      <Course/>
      </div>
      
      <Footer/>
    </>
  )
}

export default Courses
