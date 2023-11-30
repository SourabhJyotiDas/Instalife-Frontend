import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { followAndUnfollowUser, loadUser } from '../../Actions/User';
import { MdOutlineVerified } from "react-icons/md"

export default function Following({ element }) {
   const dispatch = useDispatch()
   const { user: me } = useSelector((state) => state.user);

   const [following, setFollowing] = useState(false);

   const followHandler = async () => {
      await dispatch(followAndUnfollowUser(element._id));
      setFollowing(!following);
      dispatch(loadUser());
   };

   useEffect(() => {
      element && element.following.map((item) => {
         if (item === me._id) {
            return setFollowing(true);
         } else {
            return setFollowing(false);
         }
      });
   }, [me._id, element, dispatch]);


   return (
      <div className="flex items-center  hover:scale-105 transition duration-700 ease-in-out">
         <div className='w-[100%] flex items-center text-xs md:text-sm md:space-x-5'>
            <Link to={`/user/${element._id}`}  >
               <div className='flex items-center  my-3'>
                  <img className='h-[40px] w-[40px] rounded-full ' src={element.avatar.url} alt="" />
                  <h2 className='mx-3 font-medium text-sm hover:text-gray-400 ease-in-out duration-150 lg:text-base flex items-center'> {element.name.slice(0, 10)}{`${element.name.length > 10 ? "..." : ""}`} {element.role === "verify" ? <MdOutlineVerified className='text-blue-600 mx-1' /> : null} </h2>
               </div>
            </Link>
            <div className='md:w-[]'>
               {element && element._id === me._id ? null : (
                  <button
                     className={"" + (following ? 'text-black font-medium px-5 py-2 bg-gray-200 rounded-md' : "text-white font-medium px-5 py-2 bg-blue-500 rounded-md")}
                     onClick={followHandler} >
                     {following ? "Following" : "Follow"}
                  </button>
               )}
            </div>
         </div>
      </div>
   )
}
