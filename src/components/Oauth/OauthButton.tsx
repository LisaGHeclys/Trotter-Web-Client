import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { AnyAction, Dispatch } from "redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { COLORS } from "../../UI/Colors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Oauth2ButtonProps {
  service: string;
  icon: JSX.Element;
}

const strWindowFeatures =
  "toolbar=no, menubar=no, width=600, height=700, top=100, left=100";

const OauthButton: FC<Oauth2ButtonProps> = ({ service, icon }) => {
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const navigate = useNavigate();

  const receiveMessage = (event: MessageEvent<unknown>) => {
    if (event.origin !== window.location.origin) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const message = event.data.toString();

    if (message.slice(0, 5) === "?jwt=") {
      const token = message.slice(5);
      localStorage.setItem("jwt", token);
      dispatch({ type: "LOGIN", payload: token });
      navigate("/travel");
    }
  };

  const WindowOpener = (service: string) => {
    window.removeEventListener("message", receiveMessage);

    const popup = window.open(
      process.env.REACT_APP_SERVER_URI + "/auth/" + service,
      "_blank",
      strWindowFeatures
    );
    if (!popup) return toast.error("Failed to open popup window");

    window.addEventListener("message", (event) => receiveMessage(event), false);
  };

  return (
    <OAuthButtonWrapper onClick={() => WindowOpener(service)} type="button">
      {icon}
    </OAuthButtonWrapper>
  );
};

const OAuthButtonWrapper = styled.button`
  border: none;
  background-color: ${COLORS.bg};
  cursor: pointer;

  &:hover {
    scale: 1.2;
    transition-duration: 0.4s;
  }
  &disabled {
    cursor: not-allowed;
  }
`;

export default OauthButton;
