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
import LockIcon from "@mui/icons-material/Lock";
import toast from "react-hot-toast";

const Register: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  async function register() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URI}/auth/register`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.REACT_APP_SERVER_URI,
        "Access-Control-Allow-Credentials": true
      },
      data: {
        Email: email,
        Password: password
      }
    });
    if (response.data.status !== 200 || !response.data.accessToken) {
      toast.error("An error occured, please try again later");
    } else {
      localStorage.setItem("jwt", response.data.accessToken);
      dispatch({ type: "LOGIN", payload: response.data.accessToken });
      navigate("/travel");
    }
  }

  return (
    <>
      <Navbar />
      <RegisterWrapper>
        <ImageWrapper>
          <RegisterImage src="/login.png" />
          <LoginRedirection>
            <h1>Welcome !</h1>
            <br />
            <h2>Already a member ?</h2>
            <LinkToOtherAuthButton onClick={() => navigate("/login")}>
              {t("description.registerPart3")}
            </LinkToOtherAuthButton>
          </LoginRedirection>
        </ImageWrapper>
        <FormWrapper>
          <Column>
            <h2>{t("description.registerPart1")}</h2>
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
                <LockIcon sx={{ color: "#BBBBBB" }} />
              </IconInput>
              <AuthentificationInput
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                data-testid="passwordInput"
              />
            </WrapperInput>
            <WrapperInput>
              <IconInput>
                <LockIcon sx={{ color: "#BBBBBB" }} />
              </IconInput>
              <AuthentificationInput
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                data-testid="passwordConfirmInput"
              />
            </WrapperInput>
            <AuthentificationButton
              onClick={register}
              data-testid="submitRegister"
            >
              {t("description.registerPart4")}
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

export default Register;
