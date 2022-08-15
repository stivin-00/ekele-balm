import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "./auth.css";

const Auth = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleGoogleSignIn = async (credentialResponse) => {
    const userObject = jwt_decode(credentialResponse.credential);
    if (userObject) {
      const name = userObject.name;
      const email = userObject.email;
      try {
        const response = await axios.post(
          `http://localhost:5000/api/admin/register`,
          { name, email }
        );
        console.log("res=>", response);
        setData(response);
        setLoading(false);
        if (response?.data?.message === "ok") {
          history.push(
            `/auth/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY0ZTA2ZTQyZDU1OGJkNzg5NWI4NDEiLCJuYW1lIjoiQmFsbSBBSSIsImVtYWlsIjoiYmFsbXRlY2hub2xvZ2llc0BnbWFpbC5jb20iLCJpc0V4cGVydCI6ZmFsc2UsImlhdCI6MTY2MDIyMTAyMiwiZXhwIjoxNjg2MTQxMDIyfQ.DCgm_0eTyhUjoaWYZVOdNgbXOhQ-1eabA7kBlGrypvs/${userObject.email}`
          );
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      console.log("error orccured try again later");
    }
  };

  return (
    <div className="auth-page">
      <i className={"fa fa-spinner fa-spin"} style={{ margin: "1rem" }}></i>
      <h1>WELCOME TO</h1>
      <h1>BALM ADMIN DASHBOARD</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("credetial", credentialResponse);
          handleGoogleSignIn(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
    </div>
  );
};

export default Auth;
