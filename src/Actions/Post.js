import axios from "axios";
import { server } from "../store";


export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const { data } = await axios.get(`${server}/post/${id}`, { withCredentials: true });
    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });

    const { data } = await axios.put(
      `${server}/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      }
    );
    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });

    const { data } = await axios.delete(`${server}/post/comment/${id}`, { withCredentials: true }, {
      data: { commentId },
    });
    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const createNewPost = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } }

    const { data } = await axios.post(
      `${server}/post/upload`, { userData },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePost = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const { data } = await axios.put(
      `${server}/post/${id}`,
      {
        caption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      }
    );
    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const getExploreData = () => async (dispatch) => {
  try {
    dispatch({
      type: "allPostsRequest",
    });

    const { data } = await axios.get(`${server}/post/allposts`,{withCredentials:true});
    dispatch({
      type: "allPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "allPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios.delete(`${server}/post/${id}`,{withCredentials:true});
    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};






