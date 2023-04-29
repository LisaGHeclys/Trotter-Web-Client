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
        <button type="button">
          <GoogleIcon style={{ width: "45px", height: "45px" }} />
        </button>
      );
    case "facebook":
      return (
        <button type="button">
          <FacebookIcon style={{ width: "45px", height: "45px" }} />
        </button>
      );
    default:
      return <></>;
  }
};

export default Oauth2Button;
