import React from 'react';
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai"
import { BsSearch, BsPlusSquare } from "react-icons/bs"
import { MdOutlineExplore } from "react-icons/md"
import { RiMessengerLine } from "react-icons/ri"
import { ImEnter } from "react-icons/im"
import { logoutUser } from '../Actions/User';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


export default function Navbar() {
   const dispatch = useDispatch()

   const { user } = useSelector((state) => state.user);

   const logoutHandler = () => {
      dispatch(logoutUser())
      toast.success("logout Successfully", {
         position: "top-center",
         autoClose: 1000,
         theme: "light",
      });
   }


   return (
      <>

         <div className='flex items-center justify-between border-gray-300 border-b bg-white z-50 md:hidden'>
            <h1 className='headingFont text-xl py-3 px-2 '><Link to="/">InstaLife</Link></h1>
            <div className='flex items-center'>
               <Link to="/messages"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'> <RiMessengerLine className='text-2xl' /> </div></Link>
               <div className='hover:scale-105 transition  flex items-center  ease-in duration-100'>  <button onClick={logoutHandler}><ImEnter className='text-2xl mx-3' /></button> </div>
            </div>
         </div>


         <div className='fixed bottom-0 flex items-center justify-around bg-white w-[100%] z-50 py-3 md:hidden'>
            <Link to="/"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'><AiOutlineHome className='text-2xl mx-3' /> </div></Link>
            <Link to="/search"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'> <BsSearch className='text-2xl mx-3' />  </div></Link>
            <Link to="/newpost"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'> <BsPlusSquare className='text-2xl mx-3' />  </div></Link>
            <Link to="/explore"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'> <MdOutlineExplore className='text-2xl mx-3' />  </div></Link>
            <Link to="/account"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'>
               <img className='h-[27px] w-[27px] rounded-full' src={user && user.avatar.url} alt="" />
            </div></Link>
         </div>



         <nav className='space-x-7 ml-5 hidden md:block lg:space-y-10 lg:text-xl h-[100vh] md:border-gray-300 border-r z-50'>
            <div></div>
            <h1 className='headingFont text-3xl py-5 '><Link to="/">InstaLife</Link></h1>
            <Link to="/"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'> <AiOutlineHome className='text-2xl mx-3' /> Home</div></Link>
            <Link to="/search"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'> <BsSearch className='text-2xl mx-3' /> Search </div></Link>
            <Link to="/explore"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'> <MdOutlineExplore className='text-2xl mx-3' /> Explore Posts </div></Link>
            <Link to="/messages"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'> <RiMessengerLine className='text-2xl mx-3' /> Messages </div></Link>
            <Link to="/newpost"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'> <BsPlusSquare className='text-2xl mx-3' /> Create </div></Link>
            <Link to="/account"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'><img className='h-[27px] w-[27px] mx-3 rounded-full' src={user && user.avatar.url} alt="" /> Profile </div></Link>
            <Link to="/"><div className='hover:scale-105 transition  flex items-center  ease-in duration-100'> <ImEnter className='text-2xl mx-3' /> <button onClick={logoutHandler}>Logout</button> </div></Link>
            <div></div>
         </nav>
      </>
   )
}
