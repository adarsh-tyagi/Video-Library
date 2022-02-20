import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  WATCHLATER_REQUEST,
  WATCHLATER_SUCCESS,
  WATCHLATER_FAIL,
  WATCHLATER_ADD_REQUEST,
  WATCHLATER_ADD_SUCCESS,
  WATCHLATER_ADD_FAIL,
  WATCHLATER_REMOVE_REQUEST,
  WATCHLATER_REMOVE_SUCCESS,
  WATCHLATER_REMOVE_FAIL,
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
  HISTORY_FAIL,
  HISTORY_ADD_REQUEST,
  HISTORY_ADD_SUCCESS,
  HISTORY_ADD_FAIL,
  HISTORY_REMOVE_REQUEST,
  HISTORY_REMOVE_SUCCESS,
  HISTORY_REMOVE_FAIL,
  PLAYLIST_REQUEST,
  PLAYLIST_SUCCESS,
  PLAYLIST_FAIL,
  PLAYLIST_ADD_REQUEST,
  PLAYLIST_ADD_SUCCESS,
  PLAYLIST_ADD_FAIL,
  PLAYLIST_REMOVE_REQUEST,
  PLAYLIST_REMOVE_SUCCESS,
  PLAYLIST_REMOVE_FAIL,
  PLAYLIST_VIDEO_ADD_REQUEST,
  PLAYLIST_VIDEO_ADD_SUCCESS,
  PLAYLIST_VIDEO_ADD_FAIL,
  PLAYLIST_VIDEO_REMOVE_REQUEST,
  PLAYLIST_VIDEO_REMOVE_SUCCESS,
  PLAYLIST_VIDEO_REMOVE_FAIL,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
} from "../constants/userConstant";
import axios from "axios";

// register user action
export const register = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/user/register",
      userdata,
      config
    );
    localStorage.setItem("videolibrarytoken", data.token);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data });
  }
};

// login user action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const config = { "Content-Type": "application/json" };
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/user/login",
      { email, password },
      config
    );
    localStorage.setItem("videolibrarytoken", data.token);
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAIL, payload: error.response.data });
  }
};

// logout user action
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.get(
      "http://localhost:5000//api/v1/user/logout",
      config
    );
    localStorage.removeItem("videolibrarytoken");
    dispatch({ type: LOGOUT_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data });
  }
};

// load user action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/user/me",
      config
    );
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data });
  }
};

// delete user action
export const deleteUser = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.delete(
      "http://localhost:5000/api/v1/user/me",
      config
    );
    localStorage.removeItem("videolibrarytoken");
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error.response.data });
  }
};

// update user action
export const updateUser = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      "http://localhost:5000/api/v1/user/me",
      userdata,
      config
    );
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data });
  }
};

// forgot password action
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/user/forgot/password",
      { email },
      config
    );
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data });
  }
};

// reset password action
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `http://localhost:5000/api/v1/user/reset/password/${token}`,
      passwords,
      config
    );
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data });
  }
};

// get watchlater action
export const getWatchlater = () => async (dispatch) => {
  try {
    dispatch({ type: WATCHLATER_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/user/watchlater`,
      config
    );
    dispatch({ type: WATCHLATER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: WATCHLATER_FAIL, payload: error.response.data });
  }
};

// add to watchlater action
export const addWatchlater = (videoId) => async (dispatch) => {
  try {
    dispatch({ type: WATCHLATER_ADD_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/user/watchlater/add`,
      { videoId },
      config
    );
    dispatch({ type: WATCHLATER_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: WATCHLATER_ADD_FAIL, payload: error.response.data });
  }
};

// remove from watchlater action
export const removeWatchlater = (videoId) => async (dispatch) => {
  try {
    dispatch({ type: WATCHLATER_REMOVE_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/user/watchlater/remove`,
      { videoId },
      config
    );
    dispatch({ type: WATCHLATER_REMOVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: WATCHLATER_REMOVE_FAIL, payload: error.response.data });
  }
};

// get history
export const getHistory = () => async (dispatch) => {
  try {
    dispatch({ type: HISTORY_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/user/history`,
      config
    );
    dispatch({ type: HISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HISTORY_FAIL, payload: error.response.data });
  }
};

// add to history
export const addHistory = (videoId) => async (dispatch) => {
  try {
    dispatch({ type: HISTORY_ADD_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/user/history/add`,
      { videoId },
      config
    );
    dispatch({ type: HISTORY_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HISTORY_ADD_FAIL, payload: error.response.data });
  }
};

// remove from history
export const removeHistory = (videoId) => async (dispatch) => {
  try {
    dispatch({ type: HISTORY_REMOVE_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/user/history/remove`,
      { videoId },
      config
    );
    dispatch({ type: HISTORY_REMOVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HISTORY_REMOVE_FAIL, payload: error.response.data });
  }
};

// get playlists action
export const getPlaylist = () => async (dispatch) => {
  try {
    dispatch({ type: PLAYLIST_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/user/playlists`,
      config
    );
    dispatch({ type: PLAYLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PLAYLIST_FAIL, payload: error.response.data });
  }
};

// add playlist action
export const addPlaylist = (name) => async (dispatch) => {
  try {
    dispatch({ type: PLAYLIST_ADD_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/user/playlists/create`,
      { name },
      config
    );
    dispatch({ type: PLAYLIST_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PLAYLIST_ADD_FAIL, payload: error.response.data });
  }
};

// remove playlist action
export const removePlaylist = (name) => async (dispatch) => {
  try {
    dispatch({ type: PLAYLIST_REMOVE_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/user/playlists/remove`,
      { name },
      config
    );
    dispatch({ type: PLAYLIST_REMOVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PLAYLIST_REMOVE_FAIL, payload: error.response.data });
  }
};

// add video to playlist action
export const addPlaylistVideo = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: PLAYLIST_VIDEO_ADD_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/user/playlists/add/video`,
      userdata,
      config
    );
    dispatch({ type: PLAYLIST_VIDEO_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PLAYLIST_VIDEO_ADD_FAIL, payload: error.response.data });
  }
};

// remove video from playlist action
export const removePlaylistVideo = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: PLAYLIST_VIDEO_REMOVE_REQUEST });
    const videolibrarytoken = localStorage.getItem("videolibrarytoken");
    const config = {
      headers: {
        Authorization: videolibrarytoken,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/user/playlists/remove/video`,
      userdata,
      config
    );
    dispatch({ type: PLAYLIST_VIDEO_REMOVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLAYLIST_VIDEO_REMOVE_FAIL,
      payload: error.response.data,
    });
  }
};

// clear errors action
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

// clear messages action
export const clearMessage = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGE });
};
