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

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  password: passwordReducer,
  watchHistory: watchHistoryReducer,
  playlist: playlistReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
