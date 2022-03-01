import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  getWatchlater,
  removeWatchlater,
} from "../../actions/userAction";
import { getVideoList } from "../../actions/videoAction";
import Loader from "../Loader/Loader";
import VideoCard from "./VideoCard";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "../MetaData";

const WatchLater = () => {
  const { loading, error, message, watchlater } = useSelector(
    (state) => state.watchHistory
  );
  const { loading: videoLoading, videosList } = useSelector(
    (state) => state.videos
  );
  const dispatch = useDispatch();
  const alert = useAlert();

  const removeHandler = (id) => {
    dispatch(removeWatchlater(String(id)));
  };

  useEffect(() => {
    dispatch(getWatchlater());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getVideoList(watchlater));
  }, [dispatch, watchlater]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message, alert]);

  return (
    <Fragment>
      <MetaData title="WatchLater" />
      {loading || videoLoading ? (
        <Loader />
      ) : (
        <div className="history__container">
          <h1>Your Watch Later</h1>
          <div className="videos__container">
            {videosList?.map((item) => (
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

export default WatchLater;
