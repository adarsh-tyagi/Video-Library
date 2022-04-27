import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  getHistory,
  removeHistory,
} from "../../actions/userAction";
import { getVideoList } from "../../actions/videoAction";
import Loader from "../Loader/Loader";
import VideoCard from "./VideoCard";
import DeleteIcon from "@mui/icons-material/Delete";
import "./History.css"
import MetaData from "../MetaData"

const History = () => {
  const { loading, history, error, message } = useSelector(
    (state) => state.watchHistory
  );
  const { loading: videoLoading, videosList } = useSelector(
    (state) => state.videos
  );
  const dispatch = useDispatch();
  const alert = useAlert();

  const removeHistoryHandler = (id) => {
    dispatch(removeHistory(String(id)));
  };

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVideoList(history));
  }, [dispatch, history]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, alert, error, message]);

  return (
    <Fragment>
      <MetaData title="History" />
      {loading || videoLoading ? (
        <Loader />
      ) : (
        <div className="history__container">
          <h1>Your History</h1>
          <div className="videos__container">
            {videosList?.map((item) => (
              <div key={item._id} className="video__container">
                <VideoCard video={item} />
                <button
                  className="dlt-btn"
                  onClick={() => removeHistoryHandler(String(item._id))}
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

export default History;
