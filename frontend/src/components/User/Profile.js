import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  logout,
  deleteUser,
  clearError,
  clearMessage,
  loadUser
} from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";
import Loader from "../Loader/Loader";
import UploadIcon from "@mui/icons-material/Upload";

const Profile = () => {
  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state.user
  );
  const { message, isDeleted } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/signin")
  };

  const deleteHandler = () => {
    dispatch(deleteUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated === false) {
      navigate("/signin");
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (isDeleted) {
      dispatch(loadUser());
      dispatch({ type: DELETE_USER_RESET });
      navigate("/");
    }
  }, [isAuthenticated, navigate, error, alert, dispatch, isDeleted, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="profile__container">
          <div className="container__one">
            <h1>Profile</h1>
            <img src={user?.avatar?.url} alt={user?.name} />
            <a href="/profile/update">Edit Profile</a>
          </div>
          <div className="container__two">
            <Link to="/video/upload"><UploadIcon /> Upload your video</Link>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <p>{"Joined on " + user?.created_at?.substring(0, 10)}</p>
            <Link to="/user/videos">My videos</Link>
            <button onClick={logoutHandler}>Logout</button>
            <button className="delete" onClick={deleteHandler}>
              Delete Account
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
