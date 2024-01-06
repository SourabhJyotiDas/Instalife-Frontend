import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteCommentOnPost } from '../../Actions/Post';
import { getFollowingPosts, getMyPosts } from '../../Actions/User';
import moment from 'moment';
import { MdOutlineVerified } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';


export default function CommentCard({ userId, name, avatar, comment, commentId, postId, isAccount, data }) {

   const dispatch = useDispatch();

   const { user } = useSelector((state) => state.user);
   const { loading: commentLoading, error: commentError, message: commentMessage } = useSelector((state) => state.comment);

   const deleteCommentHandle = () => {
      dispatch(deleteCommentOnPost(postId, commentId));

      if (isAccount) {
         dispatch(getMyPosts());
      } else {
         dispatch(getFollowingPosts());
      }
   };

   return (
      <>
         <div className='my-3'>
            <div className='flex justify-center w-[100%] xl:w-[100%] '>

               <div className='w-[20%] md:w-[12%] lg:w-[15%] flex justify-center'>
                  <img className='h-[35px] w-[35px]  rounded-full' src={avatar} alt="" />
               </div>

               <div className='flex items-center w-[80%]'>
                  <div className='font-medium text-sm flex flex-col items-start space-y-1'>

                     <Link to={`user/${userId}`}>
                        <div className='flex items-center'>
                           <span className=''>{name}  </span>
                           <span>{data && data.user.role === "verify" ? <MdOutlineVerified className='text-blue-600 mx-1 text-' /> : null}</span>
                        </div>
                     </Link>

                     <div className='flex items-center justify-between'>
                        <div className='flex flex-col'>
                           <p className=' text-xs text-gray-700 leading-relaxed break-all  '>{comment}</p>
                           <div className='flex items-center space-x-5'>
                              <div className='text-xs text-gray-400 '>{moment(data.createdAt).fromNow()}</div>
                              {
                                 commentLoading ? 
                                 <AiOutlineLoading className="animate-spin h-5 w-5" />
                                 :
                                    <div>
                                       {isAccount ? (<button onClick={deleteCommentHandle}><RiDeleteBinLine /></button>)
                                          : userId === user._id ? (<button onClick={deleteCommentHandle}><RiDeleteBinLine /></button>) : null}
                                    </div>
                              }
                           </div>
                        </div>
                     </div>
                  </div>

               </div>

            </div>


            <div className='h-[1px] bg-gray-200 w-[100%]'></div>
         </div>
      </>
   )
}
