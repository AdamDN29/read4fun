import React, {useState} from 'react'
import ImgAsset from '../resources'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import '../css/login.css'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();

        formData.append('emailOrUsername', username);
        formData.append('password', password);

        await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, formData)
        .then((response) => {
            console.log(response);
            sessionStorage.setItem("token", response.data.data.token);
            sessionStorage.setItem("id", response.data.data.user.id);
            sessionStorage.setItem("user", response.data.data.user.username);
            
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Login',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#B8D9A0',
                preConfirm: () => {
                    window.location.href = "/homepage";
                }	  
            }) 	  
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
                    <h1 className='titleAuth'>SIGN IN TO YOUR ACCOUNT !</h1>
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
                                placeholder="Email/Username">
                                </input>
                            </div>
                            <div className="form-group mb-3">
                                <input 
                                type="password" 
                                className="inputForm form-control" 
                                value={password} 
                                id="password" 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password">
                                </input>
                            </div>
                            <button type="submit" className="btn_login btn btn-black">
                                <span className='spans'>Login</span>
                            </button>
                            <div>
                            <p className="login">Don't have an account ? <a className="linkpage" href="/register">Register</a></p>
                            </div>
                        </div>
                    </form>
                    </div>
            </div>
        </Container>
    );
};

export default Login;