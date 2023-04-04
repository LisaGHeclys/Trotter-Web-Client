import { FC } from "react";
import { Link } from "react-router-dom";

import "../../scss/navbar.scss";

const Login: FC = () => {
  return (
    <Link className={"login"} to={"/login"}>
      Login
    </Link>
  );
};

export default Login;
