import React, { useState } from 'react'
import ImgAsset from '../resources'
import '../css/register.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
//import component Bootstrap React
import { Card, Container, Row, Col , Button, Form, Spinner } from 'react-bootstrap'
import Swal from 'sweetalert2'


function Register() {
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const registerHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(password !== passwordConfirmation){
            setIsLoading(false);
            Swal.fire({
				icon: 'warning',
				title: 'Password Confirmation Incorrect.',
                text: "Password and Password Confirmation must match",
				allowOutsideClick: false,
				allowEscapeKey: false,
				confirmButtonColor: '#D3455B',
			}) 
            return;
        }
        
        const formData = new FormData();

        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);

        await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, formData)
        .then((response) => {
            console.log(response);
            setIsLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Registration Succesful',
                text: "Please Check Your Email to Verify Your Account",
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Login',
                confirmButtonColor: "#B8D9A0",
                preConfirm: () => {
                    window.location.href = "/login";
                }
            });
        })
        .catch((error) => {
            setIsLoading(false);
            console.log("ERROR: ", error);
            let message = "";
            if(error.response.status === 400){
                if(error.response.data.error.email !== null){
                    message = error.response.data.error.email;
                    console.log("Error Email", message)
                }
                if(message === undefined){
                    message = error.response.data.error.username;
                    console.log("Error Username")
                }    
            }
            Swal.fire({
				icon: 'error',
				title: 'Registration Failed',
                text: message,
				allowOutsideClick: false,
				allowEscapeKey: false,
				confirmButtonColor: '#D3455B',
			}) 
        })
    };
    
    return (
        <Container>
            <div className="bodyRegister row vh-100 align-items-center">
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
                                <input type="text" className="inputForm form-control" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required={true}></input>
                            </div>
                            <div className="form-group mb-3">
                                <input type="email" className="inputForm form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required={true}></input>
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="inputForm form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required={true}></input>
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="inputForm form-control" name="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}  placeholder="Password Confirmation" required={true}></input>
                            </div>
                            <button type="submit" disabled={isLoading} className="btn_login btn btn-black">
                                {
                                    isLoading === false ? (<span className='spans'>Register</span>)
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
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
}

export default Register;