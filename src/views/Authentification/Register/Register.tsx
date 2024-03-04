import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import axios from "axios";
import OauthButton from "../../../components/Oauth/OauthButton";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { OauthServices } from "../Authentification.type";
import styled from "styled-components";
import { COLORS, FONT } from "../../../UI/Colors";
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
import Navbar from "../../../components/Navbar/Navbar";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const Register: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  async function register() {
    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URI}/auth/register`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.REACT_APP_SERVER_URI,
          "Access-Control-Allow-Credentials": true
        },
        data: {
          email: email,
          username: email,
          password: password
        }
      });
      if (!response.data.accessToken) {
        toast.error("An error occured, please try again later");
      } else {
        localStorage.setItem("jwt", response.data.accessToken);
        dispatch({ type: "LOGIN", payload: response.data.accessToken });
        const preferences = localStorage.getItem("preferences");
        if (preferences) {
          navigate("/");
        } else {
          navigate("/welcome");
        }
      }
    } catch (e) {
      toast.error("An error occured, please try again later");
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <RegisterWrapper>
        <ImageWrapper>
          <RegisterImage src="/login.png" />
          <LoginRedirection>
            <h1>{t("register.welcome")}</h1>
            <br />
            <h2>{t("register.member")}</h2>
            <LinkToOtherAuthButton onClick={() => navigate("/login")}>
              {t("general.logIn")}
            </LinkToOtherAuthButton>
          </LoginRedirection>
        </ImageWrapper>
        <FormWrapper>
          <Column>
            <h2>{t("register.createAccount")}</h2>
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
            <WrapperInput>
              <AuthentificationInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                data-testid="passwordConfirmInput"
              />
              <IconInput>
                <TogglePasswordButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon style={{ color: "#BBBBBB" }} />
                  ) : (
                    <VisibilityIcon style={{ color: "#BBBBBB" }} />
                  )}
                </TogglePasswordButton>
              </IconInput>
            </WrapperInput>
            <AuthentificationButton
              onClick={register}
              data-testid="submitRegister"
              disabled={loading}
            >
              {loading ? <CircularProgress /> : t("general.register")}
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
      </RegisterWrapper>
    </>
  );
};

const RegisterWrapper = styled.div`
  color: ${COLORS.text};
  font-family: ${FONT};
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  @media screen and (max-width: 912px) {
    overflow-y: visible;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  filter: brightness(100%);
  width: 100%;
  height: 100%;
  border-radius: 0 200px 0 0;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const RegisterImage = styled.img`
  flex: 1;
  margin-left: auto;
  filter: brightness(100%);
  width: 100%;
  height: 100%;
  border-radius: 0 200px 0 0;
  z-index: 1;
  position: fixed;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const LoginRedirection = styled.div`
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

const FormWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 912px) {
    height: 100%;
    padding: 0;
  }
`;

const TogglePasswordButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  position: absolute;
`;

export default Register;
