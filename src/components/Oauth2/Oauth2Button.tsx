import { FC } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

export interface Oauth2ButtonProps {
  service: string;
}

const Oauth2Button: FC<Oauth2ButtonProps> = ({ service }) => {
  switch (service) {
    case "google":
      return (
        <button
          onClick={() =>
            window.open(
              "/googleLogin",
              "_blank",
              `popup, left=${window.screenLeft / 2}, top=${
                window.screenTop / 2
              }`
            )
          }
          type="button"
        >
          <GoogleIcon style={{ width: "45px", height: "45px" }} />
        </button>
      );
    case "facebook":
      return (
        <button
          onClick={() =>
            window.open(
              "/facebookLogin",
              "_blank",
              `popup, left=${window.screenLeft / 2}, top=${
                window.screenTop / 2
              }`
            )
          }
          type="button"
        >
          <FacebookIcon style={{ width: "45px", height: "45px" }} />
        </button>
      );
    default:
      return <></>;
  }
};

export default Oauth2Button;
