import { FC } from "react";
import { Link } from "react-router-dom";

import "../../scss/navbar.scss";

const SignUp: FC = () => {
  return (
    <Link className={"signUp"} to={"/register"}>
      Sign Up
    </Link>
  );
};

export default SignUp;
