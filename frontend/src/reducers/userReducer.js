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
  DELETE_USER_RESET,
  UPDATE_USER_RESET,
  LIKED_VIDEOS_REQUEST,
  LIKED_VIDEOS_FAIL,
  LIKED_VIDEOS_SUCCESS,
} from "../constants/userConstant";

// handles register, login, logout and user details
export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return { ...state, loading: true, isAuthenticated: false };
    case LOGOUT_USER_REQUEST:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        message: action.payload.message,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        message: action.payload.message,
      };
    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload.message,
      };
    case LOGOUT_USER_FAIL:
      return { ...state, loading: false, error: action.payload.message };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case CLEAR_MESSAGE:
      return { ...state, message: null };
    default:
      return state;
  }
};

// handles update and delete user
export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        isUpdated: action.payload.success,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        isDeleted: action.payload.success,
      };
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return { ...state, loading: false, error: action.payload.message };
    case DELETE_USER_RESET:
      return { ...state, isDeleted: false };
    case UPDATE_USER_RESET:
      return { ...state, isUpdated: false };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// handles forgot and reset password
export const passwordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
      };
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload.message };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case CLEAR_MESSAGE:
      return { ...state, message: null };
    default:
      return state;
  }
};

// handles watchlater and history
export const watchHistoryReducer = (
  state = { watchlater: [], history: [], likedVideos: [] },
  action
) => {
  switch (action.type) {
    case WATCHLATER_REQUEST:
    case HISTORY_REQUEST:
    case WATCHLATER_ADD_REQUEST:
    case HISTORY_ADD_REQUEST:
    case WATCHLATER_REMOVE_REQUEST:
    case HISTORY_REMOVE_REQUEST:
    case LIKED_VIDEOS_REQUEST:
      return { ...state, loading: true };
    case WATCHLATER_SUCCESS:
      return {
        ...state,
        loading: false,
        watchlater: action.payload.watchLaterList,
      };
    case HISTORY_SUCCESS:
      return { ...state, loading: false, history: action.payload.historyList };
    case WATCHLATER_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        watchlater: action.payload.watchLaterList,
        message: action.payload.message,
      };
    case HISTORY_ADD_SUCCESS:
      return { ...state, loading: false, history: action.payload.historyList };
    case WATCHLATER_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        watchlater: action.payload.watchLaterList,
        message: action.payload.message,
      };
    case HISTORY_REMOVE_SUCCESS:
      return { ...state, loading: false, history: action.payload.history };
    case LIKED_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        likedVideos: action.payload.likedVideos,
      };
    case WATCHLATER_FAIL:
    case HISTORY_FAIL:
    case WATCHLATER_ADD_FAIL:
    case HISTORY_ADD_FAIL:
    case WATCHLATER_REMOVE_FAIL:
    case HISTORY_REMOVE_FAIL:
    case LIKED_VIDEOS_FAIL:
      return { ...state, loading: false, error: action.payload.message };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case CLEAR_MESSAGE:
      return { ...state, message: null };
    default:
      return state;
  }
};

// handles playlists
export const playlistReducer = (state = { playlists: [] }, action) => {
  switch (action.type) {
    case PLAYLIST_REQUEST:
    case PLAYLIST_ADD_REQUEST:
    case PLAYLIST_REMOVE_REQUEST:
    case PLAYLIST_VIDEO_ADD_REQUEST:
    case PLAYLIST_VIDEO_REMOVE_REQUEST:
      return { ...state, loading: true };
    case PLAYLIST_SUCCESS:
      return { ...state, loading: false, playlists: action.payload.playlists };
    case PLAYLIST_ADD_SUCCESS:
    case PLAYLIST_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        playlists: action.payload.playlists,
        message: action.payload.message,
      };
    case PLAYLIST_VIDEO_ADD_SUCCESS:
    case PLAYLIST_VIDEO_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        playlists: action.payload.playlists,
        message: action.payload.message,
      };
    case PLAYLIST_FAIL:
    case PLAYLIST_ADD_FAIL:
    case PLAYLIST_REMOVE_FAIL:
    case PLAYLIST_VIDEO_ADD_FAIL:
    case PLAYLIST_VIDEO_REMOVE_FAIL:
      return { ...state, loading: false, error: action.payload.message };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case CLEAR_MESSAGE:
      return { ...state, message: null };
    default:
      return state;
  }
};
