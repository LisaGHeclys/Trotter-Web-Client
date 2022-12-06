import * as React from "react";
import { Link } from "react-router-dom";

import "../../scss/navbar.scss";

function SignUp() {
  return (
    <Link className={"signUp"} to={"/register"}>
      Sign Up
    </Link>
  );
}

export default SignUp;
