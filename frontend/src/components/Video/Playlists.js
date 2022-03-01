import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  getPlaylist,
  removePlaylist,
  removePlaylistVideo,
} from "../../actions/userAction";
import Loader from "../Loader/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import VideoCard from "./VideoCard";
import "./Playlists.css"
import MetaData from "../MetaData";

const Playlists = () => {
  const { loading, playlists, error, message } = useSelector(
    (state) => state.playlist
  );
  const dispatch = useDispatch();
  const alert = useAlert();

  const removePlaylistHandler = (name) => {
    dispatch(removePlaylist(String(name)));
  };

  const removeVideoHandler = (id, name) => {
    dispatch(
      removePlaylistVideo({ videoId: String(id), playlistName: String(name) })
    );
  };

  useEffect(() => {
    dispatch(getPlaylist());
  }, [dispatch, message]);

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
      <MetaData title="Playlists" />
      {loading ? (
        <Loader />
      ) : (
        <div className="playlists__container">
          <h1>Your Playlists</h1>
          <div className="lists__container">
            {playlists?.map((list) => (
              <div key={list._id} className="list__container">
                <div className="list__class">
                  <p>{list.name}</p>
                  <button
                    className="dlt-btn-2"
                    onClick={() => removePlaylistHandler(list.name)}
                  >
                    <DeleteIcon /> DELETE
                  </button>
                </div>

                <div className="videos__container">
                  {list?.videos?.map((video) => (
                    <div key={video._id} className="video__container">
                      <VideoCard video={video} />
                      <button
                        className="dlt-btn"
                        onClick={() => removeVideoHandler(video._id, list.name)}
                      >
                        <DeleteIcon /> REMOVE
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Playlists;
