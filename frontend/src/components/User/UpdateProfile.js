import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearError,
  clearMessage,
  loadUser,
  updateUser,
} from "../../actions/userAction";
import Loader from "../Loader/Loader";
import PersonIcon from "@mui/icons-material/Person";
import { useAlert } from "react-alert";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import "./UpdateProfile.css";
import MetaData from "../MetaData"

const UpdateProfile = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const { message, isUpdated, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [name, setName] = useState(user?.name);
  const [avatar, setAvatar] = useState("");

  const updateDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      if (e.target.name === "name") {
        setName(e.target.value);
      }
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("avatar", avatar);
    dispatch(updateUser(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (isAuthenticated === false) {
      navigate("/signin");
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: UPDATE_USER_RESET });
      navigate("/profile");
    }
  }, [isAuthenticated, navigate, isUpdated, dispatch, alert, error, message]);

  return (
    <Fragment>
      <MetaData title="Update Profile" />
      {loading ? (
        <Loader />
      ) : (
        <div className="update__container">
          <h1>Update Profile</h1>
          <p>{user?.email}</p>
          <form encType="multipart/form-data" onSubmit={updateHandler}>
            <div>
              <PersonIcon />
              <input
                type="text"
                required
                placeholder="Name"
                name="name"
                value={name}
                onChange={updateDataChange}
              />
            </div>
            <div>
              <img src={user?.avatar?.url} alt={user?.name} />
              <input
                type="file"
                accept="image/*"
                name="avatar"
                onChange={updateDataChange}
              />
            </div>
            <input className="dlt-btn" type="submit" value="Update" />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
