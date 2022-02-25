import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  getLikedVideos,
} from "../../actions/userAction";
import Loader from "../Loader/Loader";
import VideoCard from "./VideoCard";
import DeleteIcon from "@mui/icons-material/Delete";
import { toggleLike } from "../../actions/videoAction";

const LikedVideos = () => {
  const { loading, likedVideos, error, message } = useSelector(
    (state) => state.watchHistory
  );
  const { message: videoMessage } = useSelector(
    (state) => state.videoDetail
  );

  const dispatch = useDispatch();
  const alert = useAlert();

  const removeHandler = (id) => {
    dispatch(toggleLike(id));
  };

  useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]);

  useEffect(() => {
    if (videoMessage) {
      alert.success(videoMessage);
      dispatch(clearMessage());
    }
    dispatch(getLikedVideos());
  }, [dispatch, videoMessage, alert]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [alert, error, message, dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="history__container">
          <h1>Liked Videos</h1>
          <div className="videos__container">
            {likedVideos?.map((item) => (
              <div key={item._id} className="video__container">
                <VideoCard video={item} />
                <button
                  className="dlt-btn"
                  onClick={() => removeHandler(String(item._id))}
                >
                  <DeleteIcon /> REMOVE
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LikedVideos;
