import { Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { MdOutlineVerified } from 'react-icons/md';
import { RiUserAddLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { followAndUnfollowUser, getAllUsers, getUserPosts, getUserProfile } from '../Actions/User';
import Followers from './Layouts/Followers';
import Post from './Post';
import User from './User';

export default function UserProfile() {

   const dispatch = useDispatch();
   const params = useParams();
   const navigate = useNavigate();

   const { user, error: userError, message } = useSelector((state) => state.userProfile);

   const { user: me } = useSelector((state) => state.user);

   const { loading: userpostLoading, error, posts } = useSelector((state) => state.userPosts);

   const { users, } = useSelector((state) => state.allUsers);

   const { error: likeError, message: likeMessage, loading: likeLoading, } = useSelector((state) => state.like);

   const { error: commentError, message: commentMessage, loading: commentLoading, } = useSelector((state) => state.comment);

   const { loading: followUserLoading, message: followUserMessage, error: followUserError } = useSelector((state) => state.followUser);

   const [followersToggle, setFollowersToggle] = useState(false);
   const [followingToggle, setFollowingToggle] = useState(false);
   const [following, setFollowing] = useState(false);

   const followHandler = async () => {
      await dispatch(followAndUnfollowUser(params.id));
      setFollowing(!following);
   };

   useEffect(() => {
      async function fetchData() {
         await dispatch(getUserProfile(params.id));
         await dispatch(getUserPosts(params.id));
         await dispatch(getAllUsers());
      }
      fetchData();
   }, [dispatch, params.id, me._id, commentMessage, likeMessage, followUserMessage]);

   useEffect(() => {
      if (user && String(user._id) === String(me._id)) {
         navigate("/account")
      }
      const hasFollower = user && user.followers && user.followers.some(item => String(item._id) === String(me._id));
      setFollowing(hasFollower)

   }, [navigate, user, user && user.followers, me._id, params.id,]);


   useEffect(() => {
      if (likeError || followUserError || commentError) {
         toast.error(likeError || followUserError || commentError, {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
         });
         dispatch({ type: "clearErrors" });
      }

      if (likeMessage || followUserMessage || commentMessage) {
         toast.success(likeMessage || followUserMessage || commentMessage, {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
         });
         dispatch({ type: "clearMessage" });
      }
   }, [likeError, likeMessage, userError, followUserMessage, followUserError, commentMessage, commentError, dispatch]);

   const showUserToggle = () => {
      document.getElementById("showUsers").classList.toggle("hidden")
   }



   return (
      <>

         <div className='flex flex-col'>
            <div>
               {
                  user && (
                     <>
                        <div className='p-2 my-3 '>
                           <div className='flex flex-col space-y-3 justify-center items-center '>
                              <div>
                                 <img className='h-[100px] w-[100px] rounded-full ' src={user.avatar.url} alt="" />
                              </div>
                              <h2 className='flex items-center font-medium'>
                                 {user.name}
                                 {user.role === "verify" ? <MdOutlineVerified className='text-blue-600 mx-1 text-' /> : null}
                              </h2>
                              <div className='flex space-x-2 items-center '>
                                 <a href="#userPosts">
                                    <button className='flex flex-col justify-center items-center' > <span className='font-medium'>{user.posts.length}</span> posts</button>
                                 </a>
                                 <button className='flex flex-col justify-center items-center' onClick={() => setFollowersToggle(!followersToggle)}> <span className='font-medium'>{user.followers.length}</span> Followers</button>
                                 <button className='flex flex-col justify-center items-center' onClick={() => setFollowingToggle(!followingToggle)}> <span className='font-medium'>{user.following.length}</span> Following</button>
                              </div>
                           </div>


                           <div className='flex flex-col items-center justify-center'>
                              <div className='flex  items-center space-x-3'>
                                 {
                                    followUserLoading ?
                                       <button
                                          className="p-1 px-5 rounded-md font-medium my-2 bg-[#e5e7eb]"
                                          disabled >
                                          <AiOutlineLoading className="animate-spin h-5 w-5" />
                                       </button>
                                       :
                                       <button style={{ background: following ? "#e5e7eb" : "blue", color: following ? "black" : "white", }}
                                          className="p-1 px-5 rounded-md font-medium my-2"
                                          onClick={followHandler}
                                       >
                                          {following ? "Following" : "Follow"}
                                       </button>
                                 }
                                 <button onClick={showUserToggle} className='p-2 rounded-md bg-gray-300 '>
                                    <RiUserAddLine />
                                 </button>
                              </div>
                           </div>


                           <div id='showUsers' className='hidden'>
                              <div className=" h-[100%] w-[auto] flex space-x-3 my-2 p-2  overflow-x-scroll">
                                 {users && users.length > 0 ? (
                                    users.map((user) => (
                                       <User data={user} key={user._id} />
                                    ))
                                 ) : (
                                    <p>No Users Yet</p>
                                 )}
                              </div>
                           </div>
                        </div>
                     </>
                  )
               }

               <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                  <div className="w-[100%]  p-3">
                     <p className='text-xl text-center underline'>Followers</p>

                     {user && user.followers.length > 0 ? (
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
                  <div className="w-[100%]  p-3">
                     <p className='text-xl text-center underline'>Following</p>

                     {user && user.following.length > 0 ? (
                        user.following.map((element) => (
                           <Followers element={element} key={element._id} />
                        ))
                     ) : (
                        <p className='text-center p-3'>
                           User doesn't follow anyone !
                        </p>
                     )}
                  </div>
               </Dialog>

            </div>

            <div className='md:w-[100%]  md:flex md:items-center md:justify-center  lg:mx-auto mb-5'>
               <div id='userPosts' className='md:w-[50%]'>
                  {posts && posts.length > 0 ? (
                     posts.map((post) => (
                        <Post key={post._id} data={post} />
                     ))
                  ) : (
                     <div className='flex flex-col items-center justify-center h-[100vh]'>
                        <p className='text-center text-3xl'>User have not made any post</p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   )
}
