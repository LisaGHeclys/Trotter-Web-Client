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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "sonner";
import { CircularProgress } from "@mui/material";
import { useFetchUser } from "../../../hooks/useFetchUser";

const Login: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [, fetchUser] = useFetchUser();

  const login = async () => {
    setLoading(true);
    try {
      console.log(email, password);
      const result = await loginUser(email, password);
      const resToJSON = await result.json();
      if (!result?.ok) throw new Error(resToJSON?.Message);
      localStorage.setItem("jwt", resToJSON.accessToken);
      dispatch({ type: "LOGIN", payload: resToJSON.accessToken });
      fetchUser();
      const preferences = localStorage.getItem("preferences");
      if (preferences) {
        navigate("/");
      } else {
        navigate("/welcome");
      }
    } catch (e) {
      console.error("An error occured while loging the user");
      toast.error(t("login.error"));
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <LoginWrapper>
        <FormWrapper>
          <Column>
            <h2>{t("login.logInAccount")}</h2>
            <WrapperInput>
              <IconInput>
                <MailOutlineIcon sx={{ color: "#BBBBBB" }} />
              </IconInput>
              <AuthentificationInput
                type="text"
                placeholder={t("general.email") as string}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="emailInput"
              />
            </WrapperInput>
            <WrapperInput>
              <AuthentificationInput
                type={showPassword ? "text" : "password"}
                placeholder={t("general.password") as string}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="passwordInput"
              />
              <IconInput>
                <TogglePasswordButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOffIcon style={{ color: "#BBBBBB" }} />
                  ) : (
                    <VisibilityIcon style={{ color: "#BBBBBB" }} />
                  )}
                </TogglePasswordButton>
              </IconInput>
            </WrapperInput>
            <ForgotPasswordText>{t("login.forgotPassword")}</ForgotPasswordText>
            <AuthentificationButton
              onClick={login}
              data-testid="submitLogin"
              disabled={loading}
            >
              {loading ? <CircularProgress /> : t("general.logIn")}
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
            <h1>{t("login.welcome")}</h1>
            <br />
            <h2>{t("login.noAccount")}</h2>
            <LinkToOtherAuthButton onClick={() => navigate("/register")}>
              {t("general.register")}
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

const TogglePasswordButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  position: absolute;
`;

export default Login;
