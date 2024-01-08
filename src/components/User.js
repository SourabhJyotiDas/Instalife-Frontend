import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { followAndUnfollowUser, getAllUsers, getFollowingPosts, getUserProfile, loadUser } from '../Actions/User';
import { MdOutlineVerified } from "react-icons/md"
import { AiOutlineLoading } from "react-icons/ai"
import { toast } from 'react-toastify';

export default function User({ data }) {

   const dispatch = useDispatch();

   const [following, setFollowing] = useState(false);

   const { user: me } = useSelector((state) => state.user);
   const { loading: followUserLoading, message: followUserMessage, error: followUserError } = useSelector((state) => state.followUser);

   useEffect(() => {
      data && data.followers.map((item) => {
         if (item === me._id) {
            setFollowing(!following);
         }
      });
   }, [me._id, data, dispatch]);


   const followHandler = async () => {
      await dispatch(followAndUnfollowUser(data._id));
      setFollowing(!following);
      await dispatch(getFollowingPosts());
      await dispatch(loadUser())

   };

   return (
      <>
         {
            data && data._id === me._id ? null : (
               <>
                  <div className="flex flex-col  py-5 items-center  border border-gray-300 md:py-2 md:w-[25vw] bg-white">
                     <Link to={`/user/${data._id}`}  >
                        <div className='flex flex-col  items-center my-3 space-y-3 w-[40vw] text-sm md:text-base'>
                           <img className='h-[10vh] w-[10vh] rounded-full bg-center' src={data.avatar.url} alt="" />
                           <h2 className='flex items-center font-medium hover:underline ease duration-200'>
                              {data.name.slice(0, 10)}{`${data.name.length > 10 ? "..." : ""}`}
                              {data.role === "verify" ? <MdOutlineVerified className='text-blue-600 mx-1 ' /> : null}
                           </h2>
                        </div>
                     </Link>

                     <div className=' text-blue-500'>
                        <button
                           disabled={followUserLoading}
                           onClick={followHandler}
                           className={"" + (following ? 'text-black font-medium px-5 py-1 bg-gray-200 rounded-md' : "text-white font-medium px-5 py-1 bg-blue-500 rounded-md")}>
                           {following ? "Following" : "Follow"}
                        </button>
                     </div>
                  </div>
               </>
            )}
      </>
   )
}
