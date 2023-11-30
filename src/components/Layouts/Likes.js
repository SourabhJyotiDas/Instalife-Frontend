import React, { useEffect, useState } from 'react'
import { MdOutlineVerified } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { followAndUnfollowUser, getAllUsers, getFollowingPosts, getMyPosts, loadUser } from '../../Actions/User';
import Loader from "../Loader"

export default function Likes({ data }) {

   const location = useLocation();

   const { user: me } = useSelector((state) => state.user);
   const { loading: allUsersLoading } = useSelector((state) => state.user);
   const { loading } = useSelector((state) => state.like);
   const { loading: followLoading, message: followMessage, error: followError } = useSelector((state) => state.followUser);

   const dispatch = useDispatch();

   const [following, setFollowing] = useState(false);

   const followHandler = async () => {
      if (location.pathname === "/account") {
         console.log("You are on Account");
         await dispatch(followAndUnfollowUser(data._id));
         await dispatch(loadUser())
         await dispatch(getMyPosts());
         setFollowing(!following);
      }
      if (location.pathname === "/") {
         console.log("You are on Homepage");
         await dispatch(followAndUnfollowUser(data._id));
         await dispatch(getFollowingPosts());
         await dispatch(getAllUsers());
         setFollowing(!following);
      }
   };

   useEffect(() => {
      const hasFollower = data && data.followers.some(item => String(item) === String(me._id));
      setFollowing(hasFollower);
   }, [me._id, data._id, data, followMessage]);

   return (
      <>
         <div className='flex items-center justify-between text-xs md:text-sm  hover:scale-105 transition duration-700 ease-in-out md:w-[100%] md:justify-between'>
            <div className='md:w-[]'>
               <Link to={`/user/${data._id}`}>
                  <div className='flex items-center justify-center my-3'>
                     <img className='h-[40px] w-[40px]  rounded-full ' src={data.avatar.url} alt="" />

                     <h2 className='mx-3 font-medium text-sm hover:text-gray-400 ease-in-out duration-150 lg:text-base flex items-center'> {data.name.slice(0, 10)}{`${data.name.length > 10 ? "..." : ""}`} {data.role === "verify" ? <MdOutlineVerified className='text-blue-600 mx-1' /> : null} </h2>
                  </div>
               </Link>
            </div>

            <div className='md:w-[]'>
               {data && data._id === me._id ? null : (
                  <button
                     disabled={followLoading || allUsersLoading}
                     className={"" + (following ? 'text-black font-medium px-5 py-2 bg-gray-200 rounded-md' : "text-white font-medium px-5 py-2 bg-blue-500 rounded-md")}
                     onClick={followHandler} >
                     {following ? "Following" : "Follow"}
                  </button>
               )}
            </div>
         </div>
      </>
   )
}
