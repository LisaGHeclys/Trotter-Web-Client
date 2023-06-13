import React, { FC, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./index.scss";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import OauthButton from "../../components/Oauth/OauthButton";
import { useTranslation } from "react-i18next";
import { OauthServices } from "../../model/LoginPage/LoginPage";
import { loginUser } from "./LoginPage.utils";
import styled from "styled-components";

const LoginWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const LoginImage = styled.img`
  position: absolute;
  aspect-ratio: 1/1;
  top: 80px;
  left: -10px;
  width: 120%;
  height: calc(100% - 80px);
  z-index: 1;
  filter: blur(5px);
`;

const FormWrapper = styled.div`
  margin: auto;
  width: 360px;
  height: 480px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 25px;
  border: 1px solid white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginInput = styled.input`
  width: 280px;
  height: 40px;
  margin: 12px 0px;
  padding: 0 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
`;

const LoginPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const login = async () => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      const resToJSON = await result.json();
      if (!result?.ok) throw new Error(resToJSON?.Message);
      localStorage.setItem("jwt", resToJSON.accessToken);
      dispatch({ type: "LOGIN", payload: resToJSON.accessToken });
      navigate("/travel");
    } catch (e) {
      console.error("An error occured while loging the user");
      //to put a toaster
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <LoginWrapper>
        <LoginImage src="/login.jpg" alt="Mountain landscape" />
        <FormWrapper className="loginForm">
          <Column className="flexColumn">
            <h2>{t("description.logInPart1")}</h2>
            <LoginInput
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              data-testid="emailInput"
            />
            <LoginInput
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              data-testid="passwordInput"
            />
            <button
              className="loginButton"
              onClick={login}
              data-testid="submitLogin"
            >
              {t("description.logInPart2")}
            </button>
          </Column>
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
        </FormWrapper>
      </LoginWrapper>
    </>
  );
};

export default LoginPage;
