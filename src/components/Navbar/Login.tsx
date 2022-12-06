import * as React from "react";
import { Link } from "react-router-dom";

import "../../scss/navbar.scss";

function Login() {
  return (
    <Link className={"login"} to={"/login"}>
      Login
    </Link>
  );
}

export default Login;
