import React from 'react'
import { useAuth } from '../Context/Authentication'
import toast from 'react-hot-toast'

const Logout = () => {
  const [authUser,setAuthUser]=useAuth()
  const handleLog=()=>{
    try {
      setAuthUser({
        ...authUser,
        user:null
      })
      localStorage.removeItem("Users")
      toast.success("Logout successfully!!!")
      setTimeout(()=>{
        window.location.reload();
    },1000)
      
    } catch (error) {
         toast.error("Error : "+error)
         setTimeout(()=>{
      },2000)
      
    }
  }
  return (
    <>
      <button onClick={handleLog} className='px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer'>Logout</button>
    </>
  )
}

export default Logout
