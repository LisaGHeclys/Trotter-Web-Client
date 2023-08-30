import React, { FC, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import "./index.scss";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import OauthButton from "../../../components/Oauth/OauthButton";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { OauthServices } from "../Authentification.type";

const RegisterPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
      dispatch({ type: "LOGIN", payload: response.data.accessToken });
      navigate("/travel");
    }
  }

  return (
    <>
      <Navbar />
      <div className="register">
        <p className="registerTitle">{t("description.registerPart1")}</p>
        <div className="registerText">
          {t("description.registerPart2")}{" "}
          <Link to="/login" className="registerLogin">
            {t("description.registerPart3")}
          </Link>
        </div>
        <div className="registerForm">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            data-testid="emailInput"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            data-testid="passwordInput"
          />
          <button
            className="registerButton"
            onClick={register}
            data-testid="submitRegister"
          >
            {t("description.registerPart4")}
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
