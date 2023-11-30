import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updatePassword } from '../Actions/User';
import { AiOutlineLoading } from 'react-icons/ai';

export default function UpdatePassword() {
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");

   const dispatch = useDispatch();

   const { loading: updateProfileLoading, message: updateProfileMessage, error: updateProfileError } = useSelector((state) => state.updateProfile);

   const submitHandler = async (e) => {
      e.preventDefault();
      await dispatch(updatePassword(oldPassword, newPassword));
      setOldPassword("")
      setNewPassword("")
   };

   useEffect(() => {
      if (updateProfileError) {
         toast.error(updateProfileError, {
            position: "top-center",
            autoClose: 1000,
            theme: "light",
         });
         dispatch({ type: "clearErrors" });
      }

      if (updateProfileMessage) {
         toast.success(updateProfileMessage, {
            position: "top-center",
            autoClose: 1000,
            theme: "light",
         });
         dispatch({ type: "clearMessage" });
      }
   }, [dispatch, updateProfileMessage, updateProfileError]);

   return (
      <>
         <div className=" flex items-center justify-center h-[100vh]">
            <form className="md:w-[50%] md:border border-gray-400 mx-auto flex flex-col items-center justify-center h-[90vh] space-y-5 " onSubmit={submitHandler}>
               <h1 className='headingFont text-center text-4xl py-5 '>Fight Club </h1>

               <input type="password" placeholder="Old Password" required value={oldPassword} className="w-[90%] border border-black outline-none p-2" onChange={(e) => setOldPassword(e.target.value)} />

               <input type="password" placeholder="New Password" required className="w-[90%] border border-black outline-none p-2" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

               {
                  updateProfileLoading ? <button disabled className='bg-blue-500 p-3 text-white font-semibold'>
                     <div className="animate-pulse flex items-center justify-center " >
                        <AiOutlineLoading className="animate-spin h-5 w-5 mr-3 " />
                        Changing Password
                     </div>
                  </button> :
                     <button  type="submit" className='bg-blue-500 p-3 text-white font-semibold'> Change Password </button>
               }
            </form>
         </div>
      </>
   );
}
