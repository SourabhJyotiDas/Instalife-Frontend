import { Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { MdOutlineVerified } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Followers from './Layouts/Followers';
import MyFollowing from './Layouts/MyFollowing.js';
import Loader from './Loader';
import numeral from "numeral"


export default function Profile() {

   const dispatch = useDispatch()

   const [followersToggle, setFollowersToggle] = useState(false);

   const [followingToggle, setFollowingToggle] = useState(false);

   const { user, loading, error } = useSelector((state) => state.user);

   useEffect(() => {
      if (error) {
         toast.error(error, {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
         });
         dispatch({ type: "clearErrors" });
      }
   }, [dispatch, error])

   // const deleteProfileHandler = async () => {
   //    await dispatch(deleteMyProfile());
   //    dispatch(logoutUser());
   // };

   return (
      <>
         <div className='px-2'>
            {user &&
               <div className=''>
                  <div className='w-[100%] mx-auto my-5 '>
                     <div className='flex flex-col md:flex-row md:space-x-10 items-center justify-center space-y-3'>
                        <div className='flex flex-col items-center justify-center '>
                           <img className='h-[100px] w-[100px] rounded-full' src={user.avatar.url} alt="" />
                           <h2 className='flex items-center font-medium'>
                              {user.name}
                              {user.role === "verify" ? <MdOutlineVerified className='text-blue-600 mx-1 text-' /> : null}
                           </h2>
                        </div>
                        <div className='flex space-x-4 items-center text-sm '>
                           <a href="#allPosts">
                              <button className='flex flex-col justify-center items-center'> <span className='font-medium'>{numeral(user.posts.length).format("0.a")}</span> Post</button>
                           </a>

                           <button className='flex flex-col justify-center items-center' onClick={() => setFollowersToggle(!followersToggle)}> <span className='font-medium '>{numeral(user.followers.length).format("0.a")}</span> Followers</button>
                           <button className='flex flex-col justify-center items-center' onClick={() => setFollowingToggle(!followingToggle)}> <span className='font-medium '>{numeral(user.following.length).format("0.a")}</span> Following</button>
                        </div>
                     </div>
                  </div>

                  <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                     <div className="w-[100%]  p-3">
                        <p className='text-xl text-center underline'>Followers</p>

                        {user.followers.length > 0 ? (
                           user.followers.map((element) => (
                              <Followers element={element} key={element._id} />
                           ))
                        ) : (
                           <p className='text-center p-3'>
                              User have no followers
                           </p>
                        )}
                     </div>
                  </Dialog>


                  <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                     <div className=" p-3 w-[100%] md:w-[100%] md:flex md:flex-col md:items-center md:justify-center">
                        <p className='text-xl text-center underline'>Following</p>

                        {user.following.length > 0 ? (
                           user.following.map((element) => (
                              <MyFollowing element={element} key={element._id} />
                           ))
                        ) : (
                           <p className='text-center p-3'>
                              User doesn't follow anyone ..!
                           </p>
                        )}
                     </div>
                  </Dialog>

                  <div className='flex items-center justify-around md:justify-center md:space-x-10'>
                     <Link to="/update/profile">
                        <button className='p-1 px-3 bg-gray-200 hover:bg-gray-300 transition duration-150 ease-in-out rounded-md font-medium'>Edit profile</button>
                     </Link>
                     <Link to="/update/password">
                        <button className='p-1 px-3 bg-gray-200 hover:bg-gray-300 transition duration-150 ease-in-out rounded-md font-medium'>Change Password</button>
                     </Link>
                  </div>

                  <div className='bg-gray-300 w-[100%] m-auto h-[1px] my-5'></div>

               </div>
            }
         </div>
      </>
   )
}
