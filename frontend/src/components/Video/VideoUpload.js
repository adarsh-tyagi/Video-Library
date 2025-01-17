import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  clearError,
  clearMessage,
  createVideo,
} from "../../actions/videoAction";
import Uploader from "../Uploader/Uploader";
import "./VideoUpload.css";
import MetaData from "../MetaData";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");

  const { loading, error, message } = useSelector(
    (state) => state.videoCreation
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const videoDataChange = (e) => {
    if (e.target.name === "video") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setVideo(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("title", title);
    myForm.set("description", description);
    myForm.set("video", video);
    dispatch(createVideo({ title, description, video }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
      navigate("/profile");
    }
  }, [alert, message, dispatch, error, navigate]);

  return (
    <Fragment>
      <MetaData title="Upload Video" />
      {loading ? (
        <Uploader />
      ) : (
        <div className="videoupload__container">
          <h1>Upload video</h1>
          <form encType="multipart/form-data" onSubmit={submitHandler}>
            <input
              className="form__field"
              type="text"
              name="title"
              placeholder="Title"
              required
              value={title}
              onChange={videoDataChange}
            />
            <textarea
              className="form__field"
              placeholder="Description"
              name="description"
              value={description}
              rows="10"
              required
              onChange={videoDataChange}
            ></textarea>
            <input
              className="form__field"
              type="file"
              accept="video/*"
              name="video"
              onChange={videoDataChange}
            />
            <input className="dlt-btn" type="submit" value="Upload" />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default VideoUpload;
