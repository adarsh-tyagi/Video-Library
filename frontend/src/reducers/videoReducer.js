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

// handles home, user's and search videos
export const videosReducer = (
  state = {
    allVideos: [],
    popularVideos: [],
    latestVideos: [],
    searchResults: [],
    userVideos: [],
    videosList: [],
  },
  action
) => {
  switch (action.type) {
    case HOME_VIDEOS_REQUEST:
    case SEARCH_VIDEOS_REQUEST:
    case USER_VIDEOS_REQUEST:
    case VIDEO_LIST_REQUEST:
      return { ...state, loading: true };
    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        allVideos: action.payload.all_videos,
        popularVideos: action.payload.popular_videos,
        latestVideos: action.payload.latest_videos,
      };
    case SEARCH_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload.searchResults,
      };
    case USER_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        userVideos: action.payload.userVideos,
      };

    case VIDEO_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        videosList: action.payload.videosList,
      };
    case HOME_VIDEOS_FAIL:
    case SEARCH_VIDEOS_FAIL:
    case USER_VIDEOS_FAIL:
    case VIDEO_LIST_FAIL:
      return { ...state, loading: false, error: action.payload.message };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state
  }
};

// handles video creation and deletion
export const videoCreationReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_VIDEO_REQUEST:
    case DELETE_VIDEO_REQUEST:
      return { ...state, loading: true };
    case CREATE_VIDEO_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };
    case DELETE_VIDEO_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };
    case CREATE_VIDEO_FAIL:
    case DELETE_VIDEO_FAIL:
      return { ...state, loading: false, error: action.payload.message };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case CLEAR_MESSAGE:
      return { ...state, message: null };
    default:
      return state;
  }
};

// handles video like and dislike and details
export const videoDetailReducer = (state = { video: {} }, action) => {
  switch (action.type) {
    case TOGGLE_LIKE_REQUEST:
    case TOGGLE_DISLIKE_REQUEST:
    case VIDEO_DEATILS_REQUEST:
      return { ...state, loading: true };
    case TOGGLE_LIKE_SUCCESS:
    case TOGGLE_DISLIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        video: action.payload.video,
      };
    case VIDEO_DEATILS_SUCCESS:
      return {
        ...state,
        loading: false,
        video: action.payload.video,
      };
    case TOGGLE_LIKE_FAIL:
    case TOGGLE_DISLIKE_FAIL:
    case VIDEO_DEATILS_FAIL:
      return { ...state, loading: false, error: action.payload.message };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case CLEAR_MESSAGE:
      return { ...state, message: null };
    default:
      return state;
  }
};
