import React, { FC, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./index.scss";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import OauthButton from "../../components/Oauth/OauthButton";
import { useTranslation } from "react-i18next";
import { useLoginClient } from "../../hooks/api/auth.hooks";
import { CircularProgress } from "@mui/material";

enum OauthServices {
  google = "google",
  facebook = "facebook",
  twitter = "twitter",
  linkedin = "linkedin"
}

const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { t } = useTranslation();
  const [loginClientState, loginClient] = useLoginClient();

  const handleLogin = () => {
    loginClient({ email, password });
  };

  return (
    <>
      <Navbar />
      <div className="loginFormWrapper">
        <img src="/login.jpg" className="bgImage" alt="Mountain landscape" />
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
            <button
              disabled={loginClientState.loading}
              className="loginButton"
              onClick={handleLogin}
              data-testid="submitLogin"
            >
              {loginClientState.loading ? (
                <CircularProgress />
              ) : (
                t("description.logInPart2")
              )}
            </button>
          </div>
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
      </div>
    </>
  );
};

export default LoginPage;
