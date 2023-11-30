import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMyPosts } from '../Actions/User';
import Loader from './Loader';
import Post from './Post';
import Profile from './Profile.js';

export default function Account() {

   const dispatch = useDispatch();

   const { loading: myPostsLoading, error: myPostsError, posts } = useSelector((state) => state.myPosts);

   useEffect(() => {
      window.scrollTo(0, 0)
      dispatch(getMyPosts());
   }, [dispatch]);

   useEffect(() => {
      if (myPostsError) {
         toast.error(myPostsError, {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
         });
         dispatch({ type: "clearErrors" });
      }
   }, [myPostsError, dispatch]);

   return (
      <>
         <div className='flex flex-col mb-10'>
            <Profile />
            <div id='allPosts' className='md:w-[100%]  md:flex md:items-center md:justify-center  lg:mx-auto'>
               <div className='md:w-[50%]'>
                  {
                     posts && posts.map((post,index) => (
                        <Post key={index} data={post} isAccount={true} isDelete={true} />
                     ))
                  }
               </div>
            </div>
         </div>
      </>
   )
}
