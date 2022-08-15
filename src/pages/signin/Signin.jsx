import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./signing.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import { signin } from "../../actions/userActions";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // redux
  const history = useHistory();
  const dispatch = useDispatch();
  const expertList = useSelector((state) => state.expertList);
  const userList = useSelector((state) => state.userList);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error, loading } = userSignin;

  let { emailId } = useParams();

  useEffect(() => {
    if (emailId) {
      setEmail(emailId);
    }
  }, [emailId]);

  useEffect(() => {
    if (userSignin && userInfo) {
      // toast.success("✅ signed in successfully! 😊");
    }

    if (userSignin && error) {
      toast.error(error);
    }
  }, [userSignin]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(signin(email, password));
    }
  };
  return (
    <div className="signin">
      {" "}
      <form className="inner-signup" method="POST" onSubmit={submitHandler}>
        <div
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4>Admin login</h4>
          <input
            disabled={true}
            type="email"
            value={email}
            className="input-signin"
            placeholder="email address"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            value={password}
            className="input-signin"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button type="submit" value="Submit" id="button-signup">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
