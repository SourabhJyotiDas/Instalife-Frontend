import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadUser, registerUser, updateProfile } from '../Actions/User';
import Loader from './Loader';
import { AiOutlineLoading } from "react-icons/ai"

export default function UpdateProfile() {

   const { error, user } = useSelector((state) => state.user);
   const { loading: updateLoading, error: updateError, message, } = useSelector((state) => state.like);
   const { loading: updateProfileLoading, message: updateProfileMessage } = useSelector((state) => state.updateProfile);

   const [name, setName] = useState(user.name);
   const [email, setEmail] = useState(user.email);
   const [avatar, setAvatar] = useState("");
   const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

   const dispatch = useDispatch();

   const handleImageChange = (e) => {
      const file = e.target.files[0];

      const Reader = new FileReader();
      Reader.readAsDataURL(file);

      Reader.onload = () => {
         if (Reader.readyState === 2) {
            setAvatarPrev(Reader.result);
            setAvatar(Reader.result);
         }
      };
   };

   const submitHandler = async (e) => {
      e.preventDefault();
      await dispatch(updateProfile(name, email, avatar));
      dispatch(loadUser());
   };

   useEffect(() => {
      if (error) {
         toast.error(error, {
            position: "top-center",
            autoClose: 1000,
            theme: "light",
         });
         dispatch({ type: "clearErrors" });
      }

      if (updateError) {
         toast.error(updateError, {
            position: "top-center",
            autoClose: 1000,
            theme: "light",
         });
         dispatch({ type: "clearErrors" });
      }

      if (message || updateProfileMessage) {
         toast.success(message || updateProfileMessage, {
            position: "top-center",
            autoClose: 1000,
            theme: "light",
         });
         dispatch({ type: "clearMessage" });
      }
   }, [dispatch, error, updateError, message, updateProfileMessage]);

   return (
      <>
         {
            updateLoading ? <Loader message={"Updating..."} /> :
               <div className=' h-[100vh] flex items-center justify-center '>
                  <div className='md:h-[80%] w-[100%] m-auto  py-5 rounded-md md:w-[50vw] md:mx-auto md:border border-gray-400'>
                     <h1 className='headingFont text-center text-3xl py-5 '>Fight Club </h1>
                     <div className='flex items-center justify-center'>
                        <img className='h-[100px] w-[100px] rounded-full' src={avatarPrev} alt="post" />
                     </div>
                     <form onSubmit={submitHandler} className='flex flex-col justify-center items-center mt-10'>
                        <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Name' className='w-[90%] py-2 border border-black outline-none my-2 px-2 ' />
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='Email' className='w-[90%] py-2 border border-black outline-none my-2 px-2 ' />
                        <input type="file" accept='image/*' onChange={handleImageChange} />
                        {
                           updateProfileLoading ?
                              <button  disabled className=' flex justify-center items-center bg-blue-500 w-[90%] py-3 my-5  text-white font-semibold'>
                                 <div className="animate-pulse flex items-center justify-center " >
                                    <AiOutlineLoading className="animate-spin h-5 w-5 mr-3 " />
                                    updating...
                                 </div>
                              </button> :
                              <button type='submit' className=' flex justify-center items-center bg-blue-500 w-[90%] py-3 my-5  text-white font-semibold'>Update</button>
                        }

                     </form>

                  </div>
               </div>
         }
      </>
   )
}
