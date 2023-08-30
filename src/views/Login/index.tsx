import React, { FC, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./index.scss";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OauthButton from "../../components/Oauth/OauthButton";
import { useTranslation } from "react-i18next";

enum OauthServices {
  google = "google",
  facebook = "facebook",
  twitter = "twitter",
  linkedin = "linkedin"
}

const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function login() {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URI}/auth/login`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      data: {
        Email: email,
        Password: password
      }
    });
    if (response.data.status === 200 && response.data.accessToken) {
      localStorage.setItem("jwt", response.data.accessToken);
      dispatch({ type: "LOGIN", payload: response.data.accessToken });
      navigate("/travel");
    }
  }

  return (
    <>
      <Navbar />
      <div className="loginFormWrapper">
        <div className="loginForm">
          <div className="flexColumn">
            <h2>{t("description.logInPart1")}</h2>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="loginInput"
              data-testid="emailInput"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="loginInput"
              data-testid="passwordInput"
            />
            <p className="forgotPassword">{t("description.forgotPassword")}</p>
            <button
              className="loginButton"
              onClick={() => {
                login();
              }}
              data-testid="submitLogin"
            >
              {t("description.logInPart2")}
            </button>
          </div>
          <hr className="lineText" data-content={t("description.separator")} />
          <div className="alternateLogins">
            <OauthButton
              service={OauthServices.google}
              icon={<GoogleIcon style={{ width: 45, height: 45 }} />}
            />
            <OauthButton
              service={OauthServices.facebook}
              icon={<FacebookSharpIcon style={{ width: 45, height: 45 }} />}
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
        <div className="imageWrapper">
          <img
            src="/login.png"
            alt="loginImageMontain"
            className="imageWrapper"
          />
          <div className="registerCard">
            <h1>Welcome !</h1>
            <br />
            <h2>Do not have an account ?</h2>
            <button
              className="registerLinkPageButton"
              onClick={() => {
                navigate("/register");
              }}
            >
              {t("description.registerPart4")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
