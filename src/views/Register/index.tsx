import React, { FC, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./index.scss";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import OauthButton from "../../components/Oauth/OauthButton";
import { useTranslation } from "react-i18next";
import { useRegisterClient } from "../../hooks/api/auth.hooks";
import { CircularProgress } from "@mui/material";

enum OauthServices {
  google = "google",
  facebook = "facebook",
  twitter = "twitter",
  linkedin = "linkedin"
}

const RegisterPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { t } = useTranslation();

  const [registerClientState, registerClient] = useRegisterClient();

  const handleRegister = () => {
    registerClient({ email, password });
  };

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
            disabled={registerClientState.loading}
            className="registerButton"
            onClick={handleRegister}
            data-testid="submitRegister"
          >
            {registerClientState.loading ? (
              <CircularProgress />
            ) : (
              t("description.registerPart4")
            )}
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
