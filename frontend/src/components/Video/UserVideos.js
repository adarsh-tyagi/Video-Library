import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  deleteVideo,
  getUserVideos,
  clearMessage,
} from "../../actions/videoAction";
import Loader from "../Loader/Loader";
import VideoCard from "./VideoCard";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";

const UserVideos = () => {
  const { loading, error, userVideos } = useSelector((state) => state.videos);
  const {
    loading: videoLoading,
    message,
    error: videoError,
  } = useSelector((state) => state.videoCreation);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const deleteHandler = (videoId) => {
    dispatch(deleteVideo(String(videoId)));
  };

  useEffect(() => {
    dispatch(getUserVideos());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (videoError) {
      alert.error(videoError);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
      dispatch(getUserVideos());
      navigate("/user/videos");
    }
  }, [dispatch, alert, error, message, videoError, navigate]);

  return (
    <Fragment>
      <MetaData title="Your videos" />
      {loading || videoLoading ? (
        <Loader />
      ) : (
        <div className="history__container">
          <h1>Your videos</h1>
          <div className="videos__container">
            {userVideos?.map((video) => (
              <div key={video._id} className="video__container">
                <VideoCard video={video} />
                <button
                  className="dlt-btn"
                  onClick={() => deleteHandler(String(video._id))}
                >
                  <DeleteIcon /> DELETE
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserVideos;
