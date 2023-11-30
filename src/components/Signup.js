import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Actions/User';
import Loader from './Loader';
import profile from "../Asset/Profile.png"
import { toast } from 'react-toastify';
import { BiHide } from "react-icons/bi"

export default function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(profile);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, message } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(name, email, password, avatar));
  };


  const handleShowPassword = (e) => {
    setShowPassword(showPassword === "password" ? "text" : "password");
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      dispatch({ type: "clearErrors" });
    }
    if (isAuthenticated) {
      navigate("/")
    }

  }, [dispatch, error, isAuthenticated]);

  return (
    <>
      {
        loading ? <Loader message={"This might take a few seconds"} /> :
          <div className='bg-gray-300 md:bg-gray-100 h-[auto] flex items-center justify-center md:w-[40vw] mx-auto'>
            <div className='h-[auto] w-[100%] m-auto py-5 rounded-md'>
              <h1 className='headingFont text-center text-3xl py-5 '>InstaLife</h1>

              <form onSubmit={submitHandler} className='flex flex-col justify-center items-center mt-10'>

                <div className='text-left w-[100%] px-5 text-sm text-gray-500 font-semibold'>Name</div>
                <input required minLength={4} value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='name' className='w-[90%] py-2 border border-gray outline-none px-2' />

                <div className='text-left w-[100%] px-5 mt-2 text-sm text-gray-500 font-semibold'>Email</div>
                <input required value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='name@example.com' className='w-[90%] py-2 border border-gray outline-none px-2' />

                <div className='text-left w-[100%] px-5 mt-2 text-sm text-gray-500 font-semibold'>Password</div>
                <input required minLength={8} maxLength={20} value={password} onChange={(e) => { setPassword(e.target.value) }} type={showPassword} placeholder='Password' className='w-[90%] py-2 border border-gray outline-none  px-2' />
                <div className='text-xs text-left w-[100%] px-5 text-gray-500  mt-2 font-medium'>Your password must be 8-20 characters long, contain letters and numbers.</div>
                <div className="flex  justify-end w-full px-5 ">
                  <BiHide onClick={handleShowPassword} className='text-2xl text-gray-500 relative bottom-[4.5rem] xl:bottom-[3.5rem] xl:right-5' />
                </div>

                {/* <img  src={avatar} alt="profilepic" /> */}
                {avatar && <img className='h-[100px] w-[100px] rounded-full border-2 border-black my-5' src={avatar} alt="post" />}

                <input className='w-[90%]' type="file" accept='image/*' onChange={handleImageChange} />

                <div className='text-xs my-5 w-[90%] leading-loose'>
                  <p className='font-medium'>While uploading your profile picture, please ensure:</p>
                  <li className='text-gray-800'>Your image should be in JPEG/JPG/PNG format.</li>
                  <li className='text-gray-800'>Picture resolution should be between 200x200 pixels 4000x4000 pixels.</li>
                </div>

                <button disabled={loading} type='submit' className=' flex justify-center items-center bg-purple-800 w-[90%] py-3 my-5  text-white font-semibold'>Sign up</button>
                <div className='underline'> <Link to="/login">Already a user ? Login</Link></div>
              </form>

            </div>
          </div>
      }
    </>
  )
}
