import { Button, Dialog } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineHeart, AiOutlineLoading, AiOutlineSend } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { MdOutlineModeEdit, MdOutlineVerified } from 'react-icons/md';
import { SlOptionsVertical } from 'react-icons/sl';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import { addCommentOnPost, deletePost, getExploreData, likePost, updatePost } from '../Actions/Post';
import { getFollowingPosts, getMyPosts, loadUser } from '../Actions/User';
import CommentCard from './Layouts/CommentCard.js';
import Likes from './Layouts/Likes';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
   superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2
   },
   desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
   },
   tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
   },
   mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
   }
};

export default function Post({ data, isDelete = false, isAccount = false, }) {

   const [liked, setLiked] = useState(false);
   const [likesUser, setLikesUser] = useState(false);
   const [commentValue, setCommentValue] = useState("");
   const [commentToggle, setCommentToggle] = useState(false);
   const [captionValue, setCaptionValue] = useState(data && data.caption);
   const [captionToggle, setCaptionToggle] = useState(false);
   const [showEdit, setShowEdit] = useState(false);

   const dispatch = useDispatch();
   const location = useLocation();

   const { user } = useSelector((state) => state.user);
   const { loading: updateCaptionLoading } = useSelector((state) => state.updateCaption);
   const { loading: deletePostLoading } = useSelector((state) => state.deletePost);
   const { loading: allPostLoading } = useSelector((state) => state.postOfFollowing);
   const { loading: likeLoading } = useSelector((state) => state.like);
   const { loading: myPostsLoading } = useSelector((state) => state.myPosts);
   const { loading: commentLoading } = useSelector((state) => state.comment);

   const handleLike = async () => {
      setLiked(!liked);
      await dispatch(likePost(data._id));
      if (isAccount) {
         dispatch(getMyPosts());
      }
      else if (location.pathname === "/explore") {
         dispatch(getExploreData());
      }
      else {
         dispatch(getFollowingPosts());
      }
   };

   const addCommentHandler = async (e) => {
      e.preventDefault();
      await dispatch(addCommentOnPost(data._id, commentValue));

      if (isAccount) {
         dispatch(getMyPosts());
      }
      else if (location.pathname === "/explore") {
         dispatch(getExploreData());
      }
      else {
         dispatch(getFollowingPosts());
      }
      setCommentValue("")
   };

   const updateCaptionHandler = async (e) => {
      e.preventDefault();
      await dispatch(updatePost(captionValue, data._id));
      await dispatch(getMyPosts());
   };

   const deletePostHandler = async () => {
      await dispatch(deletePost(data._id));
      await dispatch(getMyPosts());
      await dispatch(loadUser());
   };

   useEffect(() => {
      data && data.likes.forEach((item) => {
         if (item._id === user._id) {
            setLiked(true);
         }
      });
   }, [data, user._id]);

   return (
      <>
         {
            data && <div className='leading-loose my-3' >

               <div id='posts' className='flex justify-between items-center '>

                  <Link to={`/user/${data.owner._id}`}>
                     <div className='flex items-center my-3 px-2 '>
                        <img className='h-[30px] w-[30px] md:h-[35px] md:w-[35px] lg:h-[40px] lg:w-[40px] rounded-full' src={data.owner.avatar.url} alt="post" />
                        <h2 className='mx-3 font-medium text-sm hover:text-gray-400 ease-in-out duration-150 lg:text-base flex items-center'>{data.owner.name} {data.owner.role === "verify" ? <MdOutlineVerified className='text-blue-600 mx-1' /> : null} </h2>
                     </div>
                  </Link>

                  {
                     isAccount ? <div>
                        <button onClick={() => setCaptionToggle(!captionToggle)}> <SlOptionsVertical /></button>
                     </div> : null
                  }

                  <Dialog open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)} >
                     <div className=" w-[80vw] h-[100%] p-2 flex flex-col items-start space-y-5">
                        {
                           showEdit ? <form className="w-[100%] flex items-center" onSubmit={updateCaptionHandler}>
                              <input className='w-[100%] p-3 border-2 border-b-4 outline-none text-xs' type="text" value={captionValue} onChange={(e) => setCaptionValue(e.target.value)} placeholder="Caption Here..." required />
                              {
                                 updateCaptionLoading ?
                                    <button className='flex items-center bg-gray-200 p-2 mx-1' type="submit">
                                       Updating  <AiOutlineLoading className="animate-spin h-5 w-5 " />
                                    </button>
                                    :
                                    <button className='flex items-center bg-gray-200 p-2 mx-1' type="submit">
                                       Update
                                    </button>
                              }
                           </form> : null
                        }

                        {
                           !showEdit ? <button className='flex items-center' onClick={() => setShowEdit(!showEdit)}>
                              <MdOutlineModeEdit className='mr-2' /> Edit
                           </button> : null
                        }

                        {
                           deletePostLoading ? <div className="animate-pulse flex items-center justify-center " >
                              <AiOutlineLoading className="animate-spin h-5 w-5 mr-3 " />
                              Deleting...
                           </div> :
                              <div>
                                 {isDelete ? (
                                    <button onClick={deletePostHandler} className="text-red-500 flex items-center">
                                       <AiOutlineDelete className='mr-2' /> Delete
                                    </button>
                                 ) : null}
                              </div>
                        }
                     </div>
                  </Dialog>
               </div>

               <div className="h-[100]">
                  {/* {
                     data && data.images.length > 1 ?
                        <Carousel 
                        responsive={responsive}
                           swipeable={true}
                           draggable={false}
                           showDots={true}
                           ssr={true} // means to render carousel on server-side.
                           infinite={true}
                           autoPlaySpeed={1000}
                           keyBoardControl={true}
                           customTransition="all 1.5"
                           transitionDuration={500}
                           containerClass="carousel-container"
                           // removeArrowOnDeviceType={["tablet", ""]}
                           dotListClass="custom-dot-list-style"
                           // itemClass="carousel-item-padding-40-px"
                        >
                           {data && data.images.map((element, index) => {
                              return <img className='h-[100%]' key={index} src={element.url} alt="" />
                           })}
                        </Carousel> : */}
                        <img className='h-[100%]' src={data.image.url} alt="" />
                   {/* } */}
               </div>

               <div className='px-2'>
                  <div className='flex justify-between items-center mt-2 '>
                     <div className='flex items-center space-x-3 '>
                        <button
                           disabled={allPostLoading || likeLoading || myPostsLoading}
                           className='flex items-center rounded-lg hover:text-gray-400 ease-in-out duration-150' onClick={() => { handleLike(data._id) }}>{liked ? <FcLike className='text-2xl' /> : <AiOutlineHeart className='text-2xl' />}</button>
                        <button onClick={() => setCommentToggle(!commentToggle)} className='flex items-center  rounded-lg hover:text-gray-400 ease-in-out duration-150'><BiComment className='text-2xl mx-2' /></button>
                     </div>
                  </div>

                  <button disabled={data.likes.length === 0 ? true : false} onClick={() => setLikesUser(!likesUser)}>{data.likes.length} likes</button>
                  <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                     <div className="w-[80vw] p-2 h-[100vh] md:w-[100%]  md:px-5">
                        <p className='text-center my-3 text-xl'>Liked By</p>

                        {data.likes.map((like) => (
                           <Likes data={like} key={like._id} />
                        ))}

                     </div>
                  </Dialog>

                  <p className='font-medium text-base'><Link to={"/"}>{data.owner.name}_</Link> <span className='text-sm font-normal'>{data.caption.slice(0, 100)} {data.caption.length > 100 ? "..." : null} </span></p>
                  <button className='text-sm' onClick={() => setCommentToggle(!commentToggle)}>View {data.comments.length} comment</button>


                  <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
                     <div className="w-[100%] lg:w-[40vw] xl:w-[30vw] mx-auto space-y-5 h-[100vh] p-2 md:w-[70vw]">
                        <form className="flex items-center" onSubmit={addCommentHandler}>
                           <input
                              className='w-[100%] p-3 border border-b-4 outline-none'
                              type="text"
                              value={commentValue}
                              onChange={(e) => setCommentValue(e.target.value)}
                              placeholder="Comment Here..."
                              required
                              disabled={commentLoading}
                           />

                           {
                              commentLoading ?
                                 <Button type="submit" variant="contained">
                                    <AiOutlineLoading className="animate-spin h-5 w-5" />
                                 </Button>
                                 :
                                 <Button type="submit" variant="contained">Add</Button>
                           }
                        </form>

                        <p className='text-center text-2xl underline'>Comments</p>

                        {data.comments.length > 0 ? (
                           data.comments.map((item) => (
                              <CommentCard
                                 userId={item.user._id}
                                 name={item.user.name}
                                 avatar={item.user.avatar.url}
                                 comment={item.comment}
                                 commentId={item._id}
                                 key={item._id}
                                 postId={data._id}
                                 isAccount={isAccount}
                                 data={item}
                              />
                           ))
                        ) : (
                           <p className='text-center text-xl'>No comments Yet</p>
                        )}

                     </div>
                  </Dialog>

                  <div className='flex items-center'>
                     <img className='h-[30px] rounded-full border-2 shadow-xl ' src={user.avatar.url} alt="" />
                     <input disabled={commentLoading} className='outline-none w-[100%] pl-2' type="text" placeholder="Add a comment..." value={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
                     {
                        commentLoading ?
                           <div className=" flex items-center justify-center " >
                              <AiOutlineLoading className="animate-spin h-5 w-5" />
                           </div>
                           :
                           <AiOutlineSend onClick={addCommentHandler} className={`${commentValue.length === 0 ? "hidden" : "block text-2xl cursor-pointer"}`} />
                     }
                  </div>
                  <p className='text-xs text-gray-400 my-2'>{moment(data.createdAt).fromNow()}</p>
               </div>
            </div>
         }
      </>
   )
}
