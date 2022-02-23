import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, Link } from "react-router-dom";
import { clearError, getHomeVideos } from "../../actions/videoAction";
import Loader from "../Loader/Loader";

const Home = () => {
  const { loading, error, allVideos, popularVideos, latestVideos } =
    useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getHomeVideos());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Latest Videos</h1>
          {latestVideos?.map((vid) => (
            <p>Video</p>
          ))}
          <h1>Popular Video</h1>
          {popularVideos?.map((vid) => (
            <p>Video</p>
          ))}
          <h1>Watch All Videos</h1>
          {allVideos?.map((vid) => (
            <p>Video</p>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Home;
