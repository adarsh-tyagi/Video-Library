import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchVideos } from "../../actions/videoAction";
import Backdrop from "@mui/material/Backdrop";
import ReactPlayer from "react-player";

const Header = ({ isAuthenticated, user }) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  const { loading, searchResults } = useSelector((state) => state.videos);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(searchVideos(search));
    setBackdrop(true);
  };

  const closeHandler = () => {
    setBackdrop(false);
  };

  const toggleScreen = () => {
    window.innerWidth <= 600 ? setScreen(true) : setScreen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", toggleScreen);
    return () => window.removeEventListener("resize", toggleScreen);
  }, []);

  return (
    <div className="header">
      <div className="header__1">
        {!open ? (
          <MenuIcon onClick={() => setOpen(true)} />
        ) : (
          <div className="header__sidebar">
            <CloseIcon onClick={() => setOpen(false)} />
            <h1>VideoLibrary</h1>
            <div className="nav__links">
              <Link to="/" onClick={() => setOpen(false)}>
                <HomeIcon />
                Home
              </Link>
              <Link to="/watchlater" onClick={() => setOpen(false)}>
                <WatchLaterIcon />
                Watch Later
              </Link>
              <Link to="/history" onClick={() => setOpen(false)}>
                <HistoryIcon />
                History
              </Link>
              <Link to="/liked" onClick={() => setOpen(false)}>
                <ThumbUpIcon />
                Liked Videos
              </Link>
              <Link to="/playlists" onClick={() => setOpen(false)}>
                <PlaylistPlayIcon />
                Playlists
              </Link>
              {!isAuthenticated ? (
                <Link to="/signin" onClick={() => setOpen(false)}>
                  <LoginIcon />
                  Sign in
                </Link>
              ) : (
                <Link to="/profile" onClick={() => setOpen(false)}>
                  <PersonIcon />
                  Profile
                </Link>
              )}
            </div>
          </div>
        )}
        {!screen ? <Link to="/">VideoLibrary</Link> : ""}
      </div>

      <div className="header__2">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="header__3">
        {isAuthenticated ? (
          <Link to="/profile">
            <img href={user?.avatar?.url} alt="user_profile_pic" />
          </Link>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </div>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={backdrop}
        onClick={closeHandler}
      >
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          searchResults?.map((item) => (
            <Link to={`/video/${String(item._id)}`} key={item._id}>
              <ReactPlayer
                url={item.video.url}
                controls={false}
                height="70px"
                width="100px"
              />
              <p>{item.title}</p>
            </Link>
          ))
        )}
      </Backdrop>
    </div>
  );
};

export default Header;
