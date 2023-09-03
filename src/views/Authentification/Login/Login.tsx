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
            <LoginInput
              type="text"
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
            <ForgotPasswordText>
              {t("description.forgotPassword")}
            </ForgotPasswordText>
            <LoginButton onClick={login} data-testid="submitLogin">
              {t("description.logInPart2")}
            </LoginButton>
          </Column>
          <DividerText data-content="Or sign with" />
          <OAuthButtonRow>
            <OauthButton
              service={OauthServices.google}
              icon={<GoogleIcon style={{ width: 40, height: 40 }} />}
            />
            <OauthButton
              service={OauthServices.facebook}
              icon={<FacebookIcon style={{ width: 40, height: 40 }} />}
            />
            <OauthButton
              service={OauthServices.twitter}
              icon={<TwitterIcon style={{ width: 40, height: 40 }} />}
            />
            <OauthButton
              service={OauthServices.linkedin}
              icon={<LinkedInIcon style={{ width: 40, height: 40 }} />}
            />
          </OAuthButtonRow>
        </FormWrapper>
        <ImageWrapper>
          <LoginImage src="/login.png" alt="loginImageMontain" />
          <RegisterCard>
            <h1>Welcome !</h1>
            <br />
            <h2>Do not have an account ?</h2>
            <RegisterLinkBtn onClick={() => navigate("/register")}>
              {t("description.registerPart4")}
            </RegisterLinkBtn>
          </RegisterCard>
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

const RegisterCard = styled.div`
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

const RegisterLinkBtn = styled.button`
  margin-top: 34px;
  width: 180px;
  height: 48px;
  z-index: 1;
  background-color: ${COLORS.grey};
  border: none;
  border-radius: 10px;
  color: ${COLORS.bg};
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;

  &:hover {
    background-color: gray;
    transition-duration: 0.4s;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginInput = styled.input`
  background-color: ${COLORS.bg};
  width: 400px;
  height: 60px;
  padding: 0 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
  font-size: 16px;
  outline: none;

  @media screen and (max-width: 540px) {
    width: 320px;
    height: 50px;
  }
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
    color: ${COLORS.links};
    transition-duration: 0.3s;
  }
`;

const LoginButton = styled.button`
  margin-top: 34px;
  width: 180px;
  height: 48px;
  border: none;
  border-radius: 10px;
  background-color: ${COLORS.links};
  color: ${COLORS.white};
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: ${COLORS.blueGreen};
    scale: 1.06;
  }
  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

const DividerText = styled.hr`
  line-height: 1em;
  width: 50%;
  outline: 0;
  border: 0;
  position: relative;
  text-align: center;
  color: ${COLORS.grey};
  opacity: 0.5;
  padding: 30px 0;

  @media screen and (max-width: 767px) {
    width: 80%;
  }

  &:before {
    content: "";
    background: linear-gradient(
      to right,
      transparent,
      ${COLORS.text},
      transparent
    );
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: ${COLORS.text};
    padding: 0 0.5em;
    line-height: 1.5em;
    background-color: ${COLORS.bg};
  }
`;

const OAuthButtonRow = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1;
  gap: 28px;

  @media screen and (max-width: 768px) {
    gap: 32px;
  }
`;

export default Login;
