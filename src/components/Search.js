import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../Actions/User';
import User from './User';

export default function Search() {
   const { users } = useSelector((state) => state.allUsers);
   const dispatch = useDispatch()
   const [name, setName] = useState("");

   const searchHandler = (e) => {
      e.preventDefault();
      setName(e.target.value)
      dispatch(getAllUsers(name));
   }

   return (
      <>
         <div className=' h-[auto] flex items-center justify-center'>
            <div className='h-[auto] w-[100%] m-auto py-5 rounded-md'>
               <h1 className='headingFont text-center text-3xl py-5 '>InstaLife</h1>

               <form className='flex flex-col justify-center items-center mt-10'>
                  <input value={name} onChange={(e) => searchHandler(e)} type="text" placeholder='Search a friend' className='w-[90%] py-2 border border-gray-400 outline-none my-2 px-2 ' />
               </form>
            </div>
         </div >

         <div className='p-2 md:hidden mb-20'>
            <h1> Suggestions for you</h1>
            <div className=" h-[100%] w-[auto] flex space-x-3 my-2 p-2 overflow-x-scroll">
               {users && users.length > 0 ? (
                  users.map((user) => (
                     <User data={user} key={user._id} />
                  ))
               ) : (
                  <p>No Users Yet</p>
               )}
            </div>
         </div>

         <div className=' w-[80vw] md:mx-auto md:sticky md:top-0 md:p-2 hidden md:block '>
            <h1> Suggestions for you</h1>
            <div className=" h-[100%] w-[auto] flex  my-2  overflow-x-scroll">
               {users && users.length > 0 ? (
                  users.map((user) => (
                     <User data={user} key={user._id} />
                  ))
               ) : (
                  <p>No Users Yet</p>
               )}
            </div>
         </div>
      </>
   )
}
