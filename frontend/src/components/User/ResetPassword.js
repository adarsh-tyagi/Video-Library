import React, { Fragment, useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import PasswordIcon from "@mui/icons-material/Password";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { resetPassword, clearError, clearMessage } from "../../actions/userAction"
import MetaData from "../MetaData";

const ResetPassword = () => {
  const { loading, message, error, success } = useSelector((state) => state.password);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, {password, confirmPassword}));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError())
    }
    if (message && success) {
      alert.success(message);
      dispatch(clearMessage())
      navigate("/signin");
    }
  }, [message, navigate, alert, error, dispatch,success]);

  return (
    <Fragment>
      <MetaData title="Reset Password" /> 
      {loading ? (
        <Loader />
      ) : (
        <div className="login__container">
          <form onSubmit={submitHandler}>
            <div>
              <PasswordIcon />
              <input
                type="password"
                required
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <LockIcon />
              <input
                type="password"
                required
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Change Password" className="btn" />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default ResetPassword;
