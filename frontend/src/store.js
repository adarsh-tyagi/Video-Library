import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userReducer,
  profileReducer,
  passwordReducer,
  watchHistoryReducer,
  playlistReducer,
} from "./reducers/userReducer";
import {
  videoCreationReducer,
  videoDetailReducer,
  videosReducer,
} from "./reducers/videoReducer";

// combining all reducers
const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  password: passwordReducer,
  watchHistory: watchHistoryReducer,
  playlist: playlistReducer,
  videos: videosReducer,
  videoCreation: videoCreationReducer,
  videoDetail: videoDetailReducer,
});

const initialState = {};

const middleware = [thunk];

// creating store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
