import React, { useState } from 'react'
import ImgAsset from '../resources'
import '../css/register.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
//import component Bootstrap React
import { Card, Container, Row, Col , Button, Form } from 'react-bootstrap'

function Register() {
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const registerHandler = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();

        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);

        await axios.post('https://read4fun-backend.herokuapp.com/api/auth/register', formData)
        .then((response) => {
            console.log(response);
            window.location.href = "/login";
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
                    <h1>CREATE YOUR ACCOUNT !</h1>
                    <p>You must login to comment and write stories</p>
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
                <div className="col-md-5 forms">
                    <form onSubmit={registerHandler}>
                        <div className="card-body">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input>
                            </div>
                            <div className="form-group mb-3">
                                <input type="email" className="form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="form-control" name="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}  placeholder="Password Confirmation"></input>
                            </div>
                            <button type="submit" className="btn btn-black">
                                <span>Register</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
}

export default Register;