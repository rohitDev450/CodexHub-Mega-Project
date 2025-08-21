import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'
import Logout from './Logout'
import { useAuth } from '../Context/Authentication'

const Login = () => {
    const [authUser,setAuthUser]=useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async(data) => {
        const userInfo={
            email:data.email,
            password:data.password
          }
  
          await axios.post("http://localhost:5001/user/login",userInfo).then((res)=>{
              console.log(res.data);
              if(res.data){
                  toast.success('Login Successfully!!!');
                }
                localStorage.setItem("Users",JSON.stringify(res.data.user))
                document.getElementById("my_modal_3").close();
                setTimeout(()=>{
                    window.location.reload();
                },1000)
          }).catch((error)=>{
              if(error.response){
                  console.log(error);
                  toast.error("Error : "+error.response.data.message);
                  setTimeout(()=>{},2000)
              }
          })
    }
    const handleClose=()=>{
        const dialog = document.getElementById("my_modal_3");
        dialog.close();
    }
    return (
        <>
            <div>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box dark:bg-slate-900 dark:text-white">
                        <form onSubmit={handleSubmit(onSubmit)} method='dialog'>
                           {/* if there is a button in form, it will close the modal */}
                           <Link to="/" onClick={handleClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                            <h3 className="font-bold text-lg ">Login!</h3>
                            <div className='mt-4 space-y-2 '>
                                <span>Eamil</span>
                                <br />
                                <input type="email" placeholder='Enter Your Email'
                                    className=' w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900 dark:text-white'
                                    {...register("email", { required: true })} />
                                    <br />
                                    {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
                                <div className='mt-4 space-y-2'>
                                    <span>Password</span>
                                    <br />
                                    <input type="password" placeholder='Enter Your Password'
                                        className=' w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900 dark:text-white'
                                        {...register("password", { required: true })} />
                                        <br />
                                        {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
                                </div>
                                {authUser? <Logout/> : (
                                 <div className='flex justify-around mt-4'>
                                    <button className='bg-pink-500 text-white px-2 py-1 rounded-md hover:bg-pink-700 duration-300'>Login</button>
                                    <p>Not Register? <Link to="/singup" className='underline text-blue-500 cursor-pointer'>Singup</Link></p>
                                </div> 
                                )}
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </>
    )
}

export default Login
