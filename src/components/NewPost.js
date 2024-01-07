import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createNewPost } from '../Actions/Post'
import { AiOutlineLoading } from "react-icons/ai";

export default function NewPost() {

   const dispatch = useDispatch()

   const { loading: newPostLoading, error: newPostError, message: newPostMessage } = useSelector((state) => state.newPost)

   const [caption, setcaption] = useState("")
   const [image, setImage] = useState("");

   // const handleImageChange = (e) => {
   //    const files = Array.from(e.target.files);

   //    setImages([]);
   //    setImagesPreview([]);

   //    files.forEach((file) => {
   //       const reader = new FileReader();

   //       reader.onload = () => {
   //          if (reader.readyState === 2) {
   //             setImagesPreview((old) => [...old, reader.result]);
   //             setImages((old) => [...old, reader.result]);
   //          }
   //       };
   //       reader.readAsDataURL(file);
   //    });
   // };

   const handleImageChange = (e) => {
      const file = e.target.files[0];

      const Reader = new FileReader();
      Reader.readAsDataURL(file);

      Reader.onload = () => {
         if (Reader.readyState === 2) {
            setImage(Reader.result);
         }
      };
   };

   const submitHandler = async (e) => {
      e.preventDefault();

      await dispatch(createNewPost(image,caption));
      setImage(null);
      setcaption("");
   };

   useEffect(() => {
      if (newPostError) {
         toast.error(newPostError, {
            position: "top-center",
            autoClose: 1000,
            theme: "light",
         });
         dispatch({ type: "clearError" })
      }
      if (newPostMessage) {
         toast.success(newPostMessage, {
            position: "top-center",
            autoClose: 1000,
            theme: "light",
         });
         dispatch({ type: "clearMessage" })
      }
   }, [dispatch, newPostError, newPostMessage])


   return (
      <>
         <div className='w-[100%] h-[auto] flex items-center justify-center mx-auto mb-20'>

            <form className='flex flex-col items-center space-y-5 md:w-[40vw] h-[auto]  md:border-2 border-gray-300 p-5'
               onSubmit={submitHandler}
               encType="multipart/form-data"
            >
               <p className='text-center my-5 text-2xl font-medium underline'>New Post</p>

               {/* {images.length && <img src={images[0]} alt="post" />} */}

               <input
                  type="file"
                  accept="image/*"
                  // multiple
                  onChange={handleImageChange} />

               <input className='outline-none p-3 w-[100%] border border-gray-400' type="text" value={caption} placeholder="Caption" onChange={(e) => { setcaption(e.target.value) }} />

               <div className=" h-[100%] w-[100%]  flex md:flex-col  space-x-3 md:space-x-0 my-2 p-2  overflow-x-scroll ">
                  <div className='flex items-center h-full '>
                     {/* {imagesPreview && imagesPreview.map((image, index) => (
                        <img key={index} src={image}
                           className=' border-2 border-white'
                           alt="Product Preview" />
                     ))} */}
                     {
                        image ? <img src={image}
                           className=' border-2 border-white'
                           alt=" " /> : null
                     }
                  </div>
               </div>

               {
                  newPostLoading ? <button disabled={newPostLoading} className='bg-blue-500 py-2 px-3 hover:bg-blue-700 duration-150 ease-in-out text-white flex items-center animate-pulse'>
                     Uploading
                     <AiOutlineLoading className="animate-spin h-5 w-5 ml-3" />
                  </button> :
                     <button type='submit' className='bg-blue-500 py-2 px-3 hover:bg-blue-700 duration-150 ease-in-out text-white '> Upload </button>
               }
            </form>

         </div>
      </>
   )
}
