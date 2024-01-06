import { configureStore } from "@reduxjs/toolkit";
import { allUsersReducer, postOfAllUsers, postOfFollowingReducer, userProfileReducer, userReducer, } from "./Reducers/User";
import { commentReducer, deletePostReducer, exploreAllPosts, followUserReducer, likeReducer, myPostsReducer, newPostReducer, updateCaptionReducer, updateProfileReducer, userPostsReducer } from "./Reducers/Post";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,


    like: likeReducer,
    comment: commentReducer,
    newPost: newPostReducer,
    updateCaption: updateCaptionReducer,
    deletePost: deletePostReducer,
    followUser: followUserReducer,
    updateProfile: updateProfileReducer,
    explore: exploreAllPosts,

    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
    allPost: postOfAllUsers
  },
});

export default store;

// export const server = "https://instalife.vercel.app/api/v1"
export const server = "/api/v1"
