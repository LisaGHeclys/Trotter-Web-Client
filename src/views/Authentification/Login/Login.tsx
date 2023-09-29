import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import styled from "styled-components";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Navbar from "../../../components/Navbar/Navbar";
import { useTranslation } from "react-i18next";
import OauthButton from "../../../components/Oauth/OauthButton";
import { loginUser } from "./Login.utils";
import { OauthServices } from "../Authentification.type";
import { COLORS } from "../../../UI/Colors";
import {
  AuthentificationButton,
  AuthentificationInput,
  Column,
  DividerText,
  LinkToOtherAuthButton,
  OAuthButtonRow,
  IconInput,
  WrapperInput
} from "../Authentification.style";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const login = async () => {
    setLoading(true);
    try {
      console.log(email, password);
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
        <FormWrapper>
          <Column>
            <h2>{t("description.logInPart1")}</h2>
            <WrapperInput>
              <IconInput>
                <MailOutlineIcon sx={{ color: "#BBBBBB" }} />
              </IconInput>
              <AuthentificationInput
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                data-testid="emailInput"
              />
            </WrapperInput>
            <WrapperInput>
              <IconInput>
                <VisibilityOffIcon sx={{ color: "#BBBBBB" }} />
              </IconInput>
              <AuthentificationInput
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                data-testid="passwordInput"
              />
            </WrapperInput>
            <ForgotPasswordText>
              {t("description.forgotPassword")}
            </ForgotPasswordText>
            <AuthentificationButton onClick={login} data-testid="submitLogin">
              {t("description.logInPart2")}
            </AuthentificationButton>
          </Column>
          <DividerText data-content={t("description.separator")} />
          <OAuthButtonRow>
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
          </OAuthButtonRow>
        </FormWrapper>
        <ImageWrapper>
          <LoginImage src="/login.png" alt="loginImageMontain" />
          <RegisterRedirection>
            <h1>Welcome !</h1>
            <br />
            <h2>Do not have an account ?</h2>
            <LinkToOtherAuthButton onClick={() => navigate("/register")}>
              {t("description.registerPart4")}
            </LinkToOtherAuthButton>
          </RegisterRedirection>
        </ImageWrapper>
      </LoginWrapper>
    </>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  @media screen and (max-width: 1024px) {
    overflow-y: visible;
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  flex: 1;
  filter: brightness(100%);
  width: 100%;
  height: 100%;
  border-radius: 200px 0 0 0;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const LoginImage = styled.img`
  margin-left: auto;
  filter: brightness(100%);
  width: 100%;
  height: 100%;
  border-radius: 200px 0 0 0;
  z-index: 1;
  position: fixed;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const RegisterRedirection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: ${COLORS.bg};
  align-items: center;
  text-align: center;
  justify-content: center;
  position: relative;
  z-index: 10;
`;

const ForgotPasswordText = styled.p`
  display: flex;
  margin-left: 220px;
  margin-top: 0;
  justify-content: right;
  color: gray;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    margin-left: 180px;
  }
  @media screen and (max-width: 412px) {
    font-size: 14px;
    margin-left: 160px;
  }
  &:hover {
    color: ${COLORS.grey};
    transition-duration: 0.3s;
  }
`;

export default Login;
