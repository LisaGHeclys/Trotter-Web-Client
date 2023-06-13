import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { AnyAction, Dispatch } from "redux";
import { useDispatch } from "react-redux";

export interface Oauth2ButtonProps {
  service: string;
  icon: JSX.Element;
}

const strWindowFeatures =
  "toolbar=no, menubar=no, width=600, height=700, top=100, left=100";

const OauthButton: FC<Oauth2ButtonProps> = ({ service, icon }) => {
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const navigate = useNavigate();

  const receiveMessage = (event: any) => {
    if (event.origin !== window.location.origin) {
      return;
    }

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
    if (!popup) return console.error("Failed to open popup window");

    window.addEventListener("message", (event) => receiveMessage(event), false);
  };

  return (
    <button onClick={() => WindowOpener(service)} type="button">
      {icon}
    </button>
  );
};

export default OauthButton;
