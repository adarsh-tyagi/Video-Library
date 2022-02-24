import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getVideoDetails } from "../../actions/videoAction";
import Loader from "../Loader/Loader";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";

const Video = () => {
  const { loading, video, error } = useSelector((state) => state.videoDetail);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { videoId } = useParams();

  const toggleLike = () => {};
  const toggleDislike = () => {};
  const addToWatchlater = () => {};
  const addToPlaylist = () => {};

  useEffect(() => {
    dispatch(getVideoDetails(videoId));
  }, [dispatch, videoId]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="videodetails__container">
          <ReactPlayer
            url={video?.video?.url}
            controls={true}
            height="100%"
            width="100%"
            playing={true}
          />
          <div className="videodetails__info">
            <h1>{video?.title}</h1>
            <div className="videodetails__icons">
              <div className="video__icon">
                {video?.likes?.includes(String(user._id)) ? (
                  <ThumbUpIcon onClick={toggleLike} />
                ) : (
                  <ThumbUpOutlinedIcon onClick={toggleLike} />
                )}
                <span>LIKE {video?.likes?.length}</span>
              </div>
              <div className="video__icon">
                {video?.dislikes?.includes(String(user._id)) ? (
                  <ThumbDownAltIcon onClick={toggleDislike} />
                ) : (
                  <ThumbDownOutlinedIcon onClick={toggleDislike} />
                )}
                <span>DISLIKE {video?.dislikes?.length}</span>
              </div>
              <div className="video__icon">
                {user?.watchLater?.includes(String(video?._id)) ? (
                  <WatchLaterIcon onClick={addToWatchlater} />
                ) : (
                  <WatchLaterOutlinedIcon addToPlaylist={addToWatchlater} />
                )}
                <span>WATCHLATER</span>
              </div>
              <div className="video__icon">
                {user?.playlists.find((item) =>
                  item.videos.includes(String(videoId))
                ) ? (
                  <PlaylistPlayOutlinedIcon onClick={addToPlaylist} />
                ) : (
                  <PlaylistAddOutlinedIcon onClick={addToPlaylist} />
                )}
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
    </Fragment>
  );
};

export default Video;
