import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearError, getHomeVideos } from "../../actions/videoAction";
import Loader from "../Loader/Loader";
import VideoCard from "../Video/VideoCard";
import "./Home.css";

const Home = () => {
  const { loading, error, allVideos, popularVideos, latestVideos } =
    useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const alert = useAlert();

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
        <div className="home__container">
          <h1>Latest Videos</h1>
          <div className="home__videos">
            {latestVideos?.map((vid) => (
              <VideoCard key={vid._id} video={vid} />
            ))}
          </div>

          <h1>Popular Video</h1>
          <div className="home__videos">
            {popularVideos?.map((vid) => (
              <VideoCard key={vid._id} video={vid} />
            ))}
          </div>

          <h1>Watch All Videos</h1>
          <div className="home__videos">
            {allVideos?.map((vid) => (
              <VideoCard key={vid._id} video={vid} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
