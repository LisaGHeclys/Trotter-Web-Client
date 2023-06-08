import React, { FC, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./index.scss";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import OauthButton from "../../components/Oauth/OauthButton";

enum OauthServices {
  google = "google",
  facebook = "facebook",
  twitter = "twitter",
  linkedin = "linkedin"
}

const RegisterPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  async function register() {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URI}/auth/register`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.REACT_APP_SERVIER_URI,
        "Access-Control-Allow-Credentials": true
      },
      data: {
        Email: email,
        Password: password
      }
    });
    if (response.data.status !== 200 || !response.data.accessToken) {
      //Alert user ("An error occured, please try again later")
    } else {
      localStorage.setItem("jwt", response.data.accessToken);
      navigate("/travel");
    }
  }

  return (
    <>
      <Navbar />
      <div className="register">
        <p className="registerTitle">Create a new account</p>
        <div className="registerText">
          Already a member ?{" "}
          <Link to="/login" className="registerLogin">
            Log in
          </Link>
        </div>
        <div className="registerForm">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerButton" onClick={register}>
            Register
          </button>
          <hr className="lineText" data-content="Or sign with" />
          <div className="alternateLogins">
            <OauthButton
              service={OauthServices.google}
              icon={<GoogleIcon style={{ width: 45, height: 45 }} />}
            />
            <OauthButton
              service={OauthServices.facebook}
              icon={<FacebookIcon style={{ width: 45, height: 45 }} />}
            />
            <OauthButton
              service={OauthServices.twitter}
              icon={<TwitterIcon style={{ width: 45, height: 45 }} />}
            />
            <OauthButton
              service={OauthServices.linkedin}
              icon={<LinkedInIcon style={{ width: 45, height: 45 }} />}
            />
          </div>
        </div>
        <div className="spacer">
          <div className="wavy" />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
