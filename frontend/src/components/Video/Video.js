import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearError,
  clearMessage,
  getVideoDetails,
  toggleDislike,
  toggleLike,
} from "../../actions/videoAction";
import Loader from "../Loader/Loader";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import AddIcon from "@mui/icons-material/Add";
import {
  addHistory,
  addPlaylist,
  addPlaylistVideo,
  addWatchlater,
  getPlaylist,
  getWatchlater,
  removePlaylistVideo,
} from "../../actions/userAction";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./Video.css";
import MetaData from "../MetaData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#101010",
  color: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Video = () => {
  const { loading, video, error, message } = useSelector(
    (state) => state.videoDetail
  );
  const { user } = useSelector((state) => state.user);
  const {
    watchlater,
    message: userMessage,
    error: userError,
  } = useSelector((state) => state.watchHistory);
  const {
    playlists,
    message: playlistMessage,
    error: playlistError,
  } = useSelector((state) => state.playlist);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { videoId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const handleClose = () => setShowModal(false);

  const playlistChangeHandler = (e) => {
    const x_list = playlists.find((item) => item.name === e.target.value);
    if (x_list.videos.find((item) => String(item._id) === String(video._id))) {
      dispatch(
        removePlaylistVideo({
          videoId: String(video._id),
          playlistName: x_list.name,
        })
      );
    } else {
      dispatch(
        addPlaylistVideo({
          videoId: String(video._id),
          playlistName: x_list.name,
        })
      );
    }
  };

  const toggleLikeFn = (e) => {
    e.preventDefault();
    console.log("liked");
    dispatch(toggleLike(String(video._id)));
  };
  const toggleDislikeFn = (e) => {
    e.preventDefault();
    dispatch(toggleDislike(String(video._id)));
  };
  const addToWatchlaterFn = (e) => {
    e.preventDefault();
    dispatch(addWatchlater(String(video._id)));
  };

  const addToPlaylistFn = () => {
    setShowModal(true);
  };
  const createPlaylist = (e) => {
    e.preventDefault();
    dispatch(addPlaylist(playlistName));
  };

  const addHistoryFn = (e) => {
    e.preventDefault();
    dispatch(addHistory(String(video._id)));
  };

  useEffect(() => {
    dispatch(getWatchlater());
    dispatch(getPlaylist());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVideoDetails(videoId));
  }, [dispatch, videoId]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (playlistError) {
      alert.error(playlistError);
      dispatch(clearError());
    }
    if (userError) {
      alert.error(userError);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (playlistMessage) {
      alert.success(playlistMessage);
      dispatch(clearMessage());
    }
    if (userMessage) {
      alert.success(userMessage);
      dispatch(clearMessage());
    }
  }, [
    dispatch,
    alert,
    error,
    message,
    playlistError,
    userError,
    playlistMessage,
    userMessage,
  ]);

  return (
    <Fragment>
      <MetaData title={video?.title} />
      {loading ? (
        <Loader />
      ) : (
        <div className="videodetails__container">
          <div className="video__player">
            <ReactPlayer
              url={video?.video?.url}
              controls={true}
              height="100%"
              width="100%"
              playing={true}
              onStart={addHistoryFn}
            />
          </div>

          <div className="videodetails__info">
            <h1>{video?.title}</h1>
            <div className="videodetails__icons">
              <div className="video__icon">
                {video?.likes?.includes(String(user._id)) ? (
                  <ThumbUpIcon onClick={toggleLikeFn} />
                ) : (
                  <ThumbUpOutlinedIcon onClick={toggleLikeFn} />
                )}
                <span>LIKE {video?.likes?.length}</span>
              </div>
              <div className="video__icon">
                {video?.dislikes?.includes(String(user._id)) ? (
                  <ThumbDownAltIcon onClick={toggleDislikeFn} />
                ) : (
                  <ThumbDownOutlinedIcon onClick={toggleDislikeFn} />
                )}
                <span>DISLIKE {video?.dislikes?.length}</span>
              </div>
              <div className="video__icon">
                {watchlater.includes(String(video?._id)) ? (
                  <WatchLaterIcon />
                ) : (
                  <WatchLaterOutlinedIcon onClick={addToWatchlaterFn} />
                )}
                <span>WATCH LATER</span>
              </div>
              <div className="video__icon">
                <PlaylistAddOutlinedIcon onClick={addToPlaylistFn} />
                <span>SAVE</span>
              </div>
            </div>
          </div>
          <div className="videodetails__desc">
            <div className="videodetails__owner">
              <img src={video?.owner?.avatar?.url} alt={video?.owner?.name} />
              <p>{video?.owner?.name}</p>
            </div>
            <p>{video?.description}</p>
          </div>
        </div>
      )}
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 className="modal__heading">Add to Playlist</h3>

          <div className="video__playlists">
            {playlists?.map((list) => (
              <div key={list._id}>
                <input
                  type="checkbox"
                  className="larger"
                  value={list.name}
                  checked={list.videos.find(
                    (item) => String(item._id) === String(video._id)
                  )}
                  onChange={playlistChangeHandler}
                />
                <p>{list.name}</p>
              </div>
            ))}
          </div>

          <div className="video__playlistcreate">
            <AddIcon
              onClick={() =>
                setShowInput((showInput) => setShowInput(!showInput))
              }
            />
            <span>Create new Playlist</span>
          </div>

          {showInput && (
            <div className="video__playlistinput">
              <input
                type="text"
                placeholder="Playlist"
                required
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <button onClick={createPlaylist}>Create</button>
            </div>
          )}
        </Box>
      </Modal>
    </Fragment>
  );
};

export default Video;
