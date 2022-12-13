import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./index.scss";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const navigate = useNavigate();

  async function login() {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URI}/auth/login`,
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
      //Alert user ("Wrong email or Password, please try again")
    } else {
      localStorage.setItem("jwt", response.data.accessToken);
      dispatch({ type: "LOGIN", payload: { isLoggedIn: true } });
      navigate("/travel");
    }
  }

  return (
    <>
      <Navbar />
      <div className="loginFormWrapper">
        <img src="/login.jpg" className="bgImage" alt="Mountain landscape" />
        <div className="loginForm">
          <div className="flexColumn">
            <h2>Login to your account</h2>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="loginInput"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="loginInput"
            />
            <button
              className="loginButton"
              onClick={() => {
                login();
              }}
            >
              Submit
            </button>
          </div>
          <hr className="lineText" data-content="Or sign with" />
          <div className="alternateLogins">
            <button type="button">
              <GoogleIcon style={{ width: "45px", height: "45px" }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
