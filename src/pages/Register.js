import React, { useState } from 'react'
import ImgAsset from '../resources'
import '../css/register.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
//import component Bootstrap React
import { Card, Container, Row, Col , Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'


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

        await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, formData)
        .then((response) => {
            console.log(response);
 
            Swal.fire({
                title: 'Registrasi Akun Telah Berhasil',
                text: "Silahkan Cek Email Anda untuk Verifikasi Akun",
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Login',
                confirmButtonColor: '#21c177',
                preConfirm: () => {
                    window.location.href = "/login";
                  }
            });
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
                <div className="col-md-7 formss">
                    <h1 className='titleAuth'>CREATE YOUR ACCOUNT !</h1>
                    <p>You must login to comment and write stories</p>
                    <p>Already have an account? <a className="linkpage" href="/login">Login</a></p>
                </div>
                <div className="col-md-5 formss">
                    <form onSubmit={registerHandler}>
                        <div className="card-body">
                            <div className="form-group mb-3">
                                <input type="text" className="inputForm form-control" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input>
                            </div>
                            <div className="form-group mb-3">
                                <input type="email" className="inputForm form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="inputForm form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="inputForm form-control" name="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}  placeholder="Password Confirmation"></input>
                            </div>
                            <button type="submit" className="btn_login btn btn-black">
                                <span className='spans'>Register</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
}

export default Register;