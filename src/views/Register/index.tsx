import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./index.scss";

import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function register() {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URI}/auth/register`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      data: {
        Email: email,
        Password: password
      }
    });
    if (response.data.status != 200 || !response.data.accessToken) {
      //Alert user ("An error occured, please try again later")
    } else {
      localStorage.setItem("jwt", response.data.accessToken);
      navigate("/travel");
    }
  }

  return (
    <>
      <Navbar />
      <div className="register">
        <p className="registerTitle">Create a new account</p>
        <div className="registerText">
          Already a member ?{" "}
          <Link to="/login" className="registerLogin">
            Log in
          </Link>
        </div>
        <div className="registerForm">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerButton" onClick={register}>
            Register
          </button>
          <hr className="lineText" data-content="Or sign with" />
          <div className="alternateLogins">
            <button type="button">
              <GoogleIcon style={{ width: "45px", height: "45px" }} />
            </button>
          </div>
        </div>
        <div className="spacer">
          <div className="wavy" />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
