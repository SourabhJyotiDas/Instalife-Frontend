import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import Loader from './Loader';
import { FcGoogle } from "react-icons/fc";
import { server } from '../store';

export default function Login() {

   const dispatch = useDispatch()

   const { loading, error } = useSelector((state) => state.user);

   useEffect(() => {
      if (error) {
         toast.error(error, {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
         });
         dispatch({ type: "clearErrors" });
      }

   }, [dispatch, error,])

   const myServer = "http://localhost:5000/api/v1";

   const handleGoogleLogin = () => {
      window.open(`${server}/googlelogin`, "_self");
   };

   return (
      <>
         {
            loading ? <Loader message="Connecting" /> :
               <div className=' h-[100vh] flex items-center bg-gray-300 justify-center md:mx-auto md:w-[50vw]'>
                  <div className='h-[auto] w-[100%] m-auto  py-5 rounded-md'>

                     <div className='flex flex-col justify-center items-center mt-10'>
                        <button className=' flex justify-center items-center bg-white w-[90%] py-3 my-5  font-semibold' onClick={handleGoogleLogin}>
                           <FcGoogle className='text-2xl mr-3' />Signin with Google
                        </button>
                     </div>

                  </div>
               </div>
         }
      </>
   )
}
