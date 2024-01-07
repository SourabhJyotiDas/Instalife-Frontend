import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from './Loader.js';
import { getAllUsers, getFollowingPosts } from '../Actions/User.js';
import Post from "./Post.js"
import User from './User.js';

export default function Home() {

  const dispatch = useDispatch()
  const { posts, error } = useSelector((state) => state.postOfFollowing);
  console.log(posts);
  const { error: likeError } = useSelector((state) => state.like);
  const { users, loading: allUsersLoading } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      toast.error(likeError, {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      dispatch({ type: "clearErrors" });
    }
  }, [error, likeError, dispatch]);


  return (
    <>
      <div className='mb-14 md:mb-0 '>
        <div className='md:flex md:flex-row-reverse'>
          <div className='md:w-[30%] lg:w-[40%] md:mb-20'>
            {
              allUsersLoading ? <Loader message="Fetching all users" /> :
                <div className='md:h-[100vh] md:sticky md:top-5 '>
                  <h1 className='p-2 font-medium md:text-center'> Suggestions for you</h1>
                  <div className=" h-[100%]  w-[100%]  flex md:flex-col  space-x-3 md:space-x-0 my-2 p-2  overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll ">
                    {users && users.length > 0 ? (
                      users.map((user) => (
                        <User data={user} key={user._id} />
                      ))
                    ) : (
                      <p>No Users Yet</p>
                    )}
                  </div>
                </div>
            }
          </div>
          <div className='md:w-[70%] lg:w-[60%] md:flex md:flex-col md:p-10'>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Post key={post._id} data={post} isAccount={false} />
              ))
            ) : (
              <p className='h-[100vh] flex items-center justify-center'>Follow someone to see their posts</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
