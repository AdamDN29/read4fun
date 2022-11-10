import React from 'react'
import { useState, useEffect } from "react";
import ImgAsset from '../resources'
import '../css/navbars.css'

//import component Bootstrap React
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import { Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'


export default function Navbars () {
    const [user, setUser] = useState([]);

    const [userId, setUserId] = useState(() => {
		const localData = sessionStorage.getItem("id");
		return localData ? localData : null;
	});

    const [username, setUsername] = useState(() => {
		const localData = sessionStorage.getItem("user");
		return localData ? localData : null;
	});

    var isLoggedIn = false;

    if(userId !== null){
		var isLoggedIn = true;
	}

    const [imageHolder, setImageHolder] = useState('');
	
    useEffect(() => {	
		if (userId !== null){	
			axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/${userId}`)
			.then((response)=> {
				console.log(response);
				setUser(response.data.data);
					// if(response.data.data.avatar !== null){
					// 	setImageHolder(statusAvatar);
					// }else{
					// 	setImageHolder(response.data.data.avatar);
					// }		
			})
		}		
	}, [])

    // logout handler
	const logoutHandler = () => {
        const userToken = sessionStorage.getItem("token");
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`,
            {
                headers: {
                    'Authorization' : `Bearer ${userToken}`
                }
            }
        )
			.then((response)=> {
				console.log(response);
				sessionStorage.clear();
                
                Swal.fire({
                    icon: 'success',
                    title: 'Log Out Succesfull !',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#21c177',
                    preConfirm: () => {
                        window.location.href = "/homepage";
                    }                        
                });					
			})
            .catch((error) => {
                console.log("ERROR: ", error);
                Swal.fire({
                    title: 'Error !',
                    text: `Failed to Log Out`,
                    icon: 'error',
                    confirmButtonColor: '#B8D9A0'
                })
            })	
	};


    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                        src = {ImgAsset.logo}
                        // width="150"
                        // height="30"
                        className="navbar_brand d-inline-block align-center"
                        alt="Read4Fun logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/browse" state={{link_query: ""}} className="nav_icon_field nav-link">
                                <img
                                src = {ImgAsset.compass_browse}
                                width="30"
                                height="30"
                                className="nav_icon_img d-inline-block"
                                alt="Icon Browse"
                                />
                                <span className='nav_icon_text'>Browse</span>
                                <div className='navbar_browse'></div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/updates" className="nav_icon_field nav-link">
                                <img
                                src = {ImgAsset.book_updates}
                                width="30"
                                height="30"
                                className="nav_icon_img d-inline-block"
                                alt="Icon Updates"
                                />
                                <span className='nav_icon_text'>Updates</span>
                            </Nav.Link>

                        </Nav>
                        <Nav pullRight>
                            { isLoggedIn === false ? 
                            (<>
                                {/* Login & Register Button */}
                                <Nav.Link href="/login">
                                    <Button variant="outline-primary" className='Btn_Login'>Login</Button>{' '}
                                </Nav.Link>
                                <Nav.Link href="/register">
                                    <Button variant="primary" className='Btn_Register'>Register</Button>
                                </Nav.Link>
                             </>
                            ) : 
                            (<>
                                {/* Avatar User */}
                                <NavDropdown 
                                    title={
                                        <>
                                        {
                                            user.avatar !== null ?(
                                                <>
                                                <img src = {user.avatar} style={{width: 45, height: 45, borderRadius: 45/ 2}}/>
                                                </>
                                            ):(
                                                <>
                                                <img
                                                src = {ImgAsset.avatar}
                                                width="45"
                                                height="45"
                                                className="d-inline-block"
                                                alt="avatar"
                                                />
                                                </>
                                            )
                                        }
                                        </>
                                    }
                                    id="navbarScrollingDropdown" className="ml-auto">
                                        <NavDropdown.Item href="/dashboard" className='username_nav'>{user.username}</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/dashboard" >Dashboard</NavDropdown.Item>
                                        <NavDropdown.Item href="/editprofile">Edit Profile</NavDropdown.Item>
                                        <NavDropdown.Item onClick={logoutHandler} className="logout_nav">Log Out</NavDropdown.Item>
                                </NavDropdown>
                             </>
                            )
                            }   
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}