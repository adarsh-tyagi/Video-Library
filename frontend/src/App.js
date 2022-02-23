import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import { loadUser } from "./actions/userAction";
import Home from "./components/User/Home";
import Signin from "./components/User/Signin";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import WatchLater from "./components/Video/WatchLater";
import History from "./components/Video/History";
import LikedVideos from "./components/Video/LikedVideos";
import Playlists from "./components/Video/Playlists";
import UserVideos from "./components/Video/UserVideos";
import Video from "./components/Video/Video";
import VideoUpload from "./components/Video/VideoUpload";

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/password/forgot" element={<ForgotPassword />} />
            <Route
              exact
              path="/password/reset/:token"
              element={<ResetPassword />}
            />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/profile/update" element={<UpdateProfile />} />
            <Route exact path="/watchlater" element={<WatchLater />} />
            <Route exact path="/history" element={<History />} />
            <Route exact path="/liked" element={<LikedVideos />} />
            <Route exact path="/playlists" element={<Playlists />} />
            <Route exact path="/user/videos" element={<UserVideos />} />
            <Route exact path="/video/:videoId" element={<Video />} />
            <Route exact path="/video/upload" element={<VideoUpload />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
