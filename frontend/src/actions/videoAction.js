import {
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_FAIL,
  SEARCH_VIDEOS_REQUEST,
  SEARCH_VIDEOS_SUCCESS,
  VIDEO_DEATILS_FAIL,
  VIDEO_DEATILS_REQUEST,
  VIDEO_DEATILS_SUCCESS,
  VIDEO_LIST_FAIL,
  VIDEO_LIST_REQUEST,
  VIDEO_LIST_SUCCESS,
  CREATE_VIDEO_FAIL,
  CREATE_VIDEO_REQUEST,
  CREATE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
  DELETE_VIDEO_REQUEST,
  DELETE_VIDEO_SUCCESS,
  USER_VIDEOS_FAIL,
  USER_VIDEOS_REQUEST,
  USER_VIDEOS_SUCCESS,
  TOGGLE_DISLIKE_FAIL,
  TOGGLE_DISLIKE_REQUEST,
  TOGGLE_DISLIKE_SUCCESS,
  TOGGLE_LIKE_FAIL,
  TOGGLE_LIKE_REQUEST,
  TOGGLE_LIKE_SUCCESS,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
} from "../constants/videoConstant";
import axios from "axios";

// get home video action
export const getHomeVideos = () => async (dispatch) => {
  try {
    dispatch({ type: HOME_VIDEOS_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/video`,
      config
    );
    dispatch({ type: HOME_VIDEOS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HOME_VIDEOS_FAIL, payload: error.response.data });
  }
};

// search video action
export const searchVideos = (search) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_VIDEOS_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/video/search?search=${search}`,
      config
    );
    dispatch({ type: SEARCH_VIDEOS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEARCH_VIDEOS_FAIL, payload: error.response.data });
  }
};

// get user videos action
export const getUserVideos = () => async (dispatch) => {
  try {
    dispatch({ type: USER_VIDEOS_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/video/user/videos`,
      config
    );
    dispatch({ type: USER_VIDEOS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_VIDEOS_FAIL, payload: error.response.data });
  }
};

// video list action
export const getVideoList = (videos_list) => async (dispatch) => {
  try {
    dispatch({ type: VIDEO_LIST_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/video/list`,
      { videos_list },
      config
    );
    dispatch({ type: VIDEO_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VIDEO_LIST_FAIL, payload: error.response.data });
  }
};

// create video action
export const createVideo = (videodata) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_VIDEO_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/video/create`,
      videodata,
      config
    );
    dispatch({ type: CREATE_VIDEO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_VIDEO_FAIL, payload: error.response.data });
  }
};

// delete video action
export const deleteVideo = (videoId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_VIDEO_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/video/delete`,
      { videoId },
      config
    );
    dispatch({ type: DELETE_VIDEO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_VIDEO_FAIL, payload: error.response.data });
  }
};

// toggle like action
export const toggleLike = (videoId) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_LIKE_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/video/like`,
      { videoId },
      config
    );
    dispatch({ type: TOGGLE_LIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TOGGLE_LIKE_FAIL, payload: error.response.data });
  }
};

// toggle dislike action
export const toggleDislike = (videoId) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_DISLIKE_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/video/dislike`,
      { videoId },
      config
    );
    dispatch({ type: TOGGLE_DISLIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TOGGLE_DISLIKE_FAIL, payload: error.response.data });
  }
};

// video details action
export const getVideoDetails = (videoId) => async (dispatch) => {
  try {
    dispatch({ type: VIDEO_DEATILS_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/video/details/${videoId}`,
      config
    );
    dispatch({ type: VIDEO_DEATILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VIDEO_DEATILS_FAIL, payload: error.response.data });
  }
};

// clear errors
export const clearError = () => async (dispatch) => {
    dispatch({type: CLEAR_ERROR})
}

// clear messages
export const clearMessage = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGE });
};