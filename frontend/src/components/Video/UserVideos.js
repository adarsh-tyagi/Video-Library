import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getUserVideos } from "../../actions/videoAction";
import Loader from "../Loader/Loader";
import VideoCard from "./VideoCard";
import DeleteIcon from "@mui/icons-material/Delete";

const UserVideos = () => {
  const { loading, error, userVideos } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const alert = useAlert();

  const deleteHandler = () => {};

  useEffect(() => {
    dispatch(getUserVideos());
  }, [dispatch]);

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
        <div className="uservideoslist__container">
          <h1>Your videos</h1>
          <div className="uservideos__container">
            {userVideos?.map((video) => (
              <div key={video._id} className="uservideo__container">
                <VideoCard video={video} />
                <button className="dlt-btn" onClick={deleteHandler}>
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
