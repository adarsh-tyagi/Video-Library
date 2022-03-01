import React, { Fragment, useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import {
  clearError,
  clearMessage,
  forgotPassword,
} from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";

const ForgotPassword = () => {
  const { loading, message, error, success } = useSelector(
    (state) => state.password
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
    if (success) {
      navigate("/");
    }
  }, [message, error, alert, dispatch, navigate, success]);

  return (
    <Fragment>
      <MetaData title="Forgot Password" />
      {loading ? (
        <Loader />
      ) : (
        <div className="login__container">
          <form encType="multipart/form-data" onSubmit={submitHandler}>
            <div>
              <EmailIcon />
              <input
                type="email"
                required
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input type="submit" value="Send Link" className="btn" />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
