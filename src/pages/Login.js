import React, { useState } from "react";
import ImgAsset from "../resources";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/login.css";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  console.log("prev route flag : ", sessionStorage.getItem("prevPath"))

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.append("emailOrUsername", username);
    formData.append("password", password);

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, formData)
      .then((response) => {
        console.log(response);

        if (response.data.data.user.banned == 1) {
          setIsLoading(false);
          Swal.fire({
            icon: "warning",
            title: "Your Account Is Banned!",
            text: "Reason: " + response.data.data.user.ban[0].explanation,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: "#B8D9A0",
            footer:
              '<center><p>Please contact <a href="mailto:read4fun.developer@gmail.com"> read4fun.developer@gmail.com </a> <br>if you think this is a mistake </p></center>',
          });
        } else {
          sessionStorage.setItem("token", response.data.data.token);
          sessionStorage.setItem("id", response.data.data.user.id);
          sessionStorage.setItem("user", response.data.data.user.username);
          setIsLoading(false);
          Swal.fire({
            icon: "success",
            title: "Login Succesful",
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: "#B8D9A0",
            preConfirm: () => {
              if (sessionStorage.getItem("prevPath") === "true"){
                window.location.href = "/homepage";
              }else{navigate(-1);} 
            },
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("ERROR: ", error);
        Swal.fire({
          icon: "error",
          title: "Login Failed.",
          text: error.response.data.error,
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: "#D3455B",
        });
      });
  };

  return (
    <Container>
      <div className="bodyLogin row vh-100 align-items-center">
        <a href="/homepage">
          <img src={ImgAsset.logo} className="logo" alt="Read4Fun logo" />
        </a>

        <div className="col-md-7 formss">
          <h1 className="titleAuth">SIGN IN TO YOUR ACCOUNT !</h1>
          <p>You must login to comment and write stories</p>
        </div>
        <div className="col-md-5 formss">
          <form onSubmit={loginHandler}>
            <div className="card-body">
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="inputForm form-control"
                  value={username}
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email/Username"
                  required={true}
                ></input>
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="inputForm form-control"
                  value={password}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required={true}
                ></input>
              </div>
              <button disabled={isLoading} type="submit" className="btn_login btn btn-black">
                {
                    isLoading === false ? (<span className="spans">Login</span>)
                    :(
                        <>
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />{" "} Loading... </>
                    )
                }
              </button>
              <div>
                <p className="login">
                  Don't have an account ?{" "}
                  <a className="linkpage" href="/register">
                    Register
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Login;
