import React, {useState} from 'react'
import ImgAsset from '../resources'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import '../css/login.css'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Form } from 'react-bootstrap'

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();

        formData.append('emailOrUsername', username);
        formData.append('password', password);

        await axios.post('https://read4fun-backend.herokuapp.com/api/auth/login', formData)
        .then((response) => {
            console.log(response);
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("id", response.data.id);
            sessionStorage.setItem("user", response.data.name);
            window.location.href = "/homepage";
        })
        .catch((error) => {
            console.log("ERROR: ", error);
        })
    };

    return (
        <Container>
            <div className="row vh-100 align-items-center">
            <a href="/homepage">
                <img src = {ImgAsset.logo}
                className="logo"
                alt="Read4Fun logo"
                />
            </a>
            
                <div className="col-md-7 forms">
                    <h1>SIGN IN TO YOUR ACCOUNT !</h1>
                    <p>You must login to comment and write stories</p>
                </div>
                <div className="col-md-5 forms">
                    <form onSubmit={loginHandler}>
                        <div className="card-body">
                            <div className="form-group mb-3">
                                <input 
                                type="text" 
                                className="form-control" 
                                value={username}
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Email/Username">
                                </input>
                            </div>
                            <div className="form-group mb-3">
                                <input 
                                type="password" 
                                className="form-control" 
                                value={password} 
                                id="password" 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password">
                                </input>
                            </div>
                            <button type="submit" className="btn btn-black">
                                <span>Login</span>
                            </button>
                            <div>
                            <p className="login">Don't have an account? <a href="/register">Register</a></p>
                            </div>
                        </div>
                    </form>
                    </div>
            </div>
        </Container>
    );
};

export default Login;