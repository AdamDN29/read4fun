import React from 'react'
import ImgAsset from '../resources'
import '../css/navbars.css'

//import component Bootstrap React
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import { Router, Routes, Route, Link } from "react-router-dom";

export default function Navbars () {
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
                            <Nav.Link as={Link} to="/browsepage" className="nav_icon_field nav-link">
                                <img
                                src = {ImgAsset.compass_browse}
                                width="30"
                                height="30"
                                className="d-inline-block"
                                alt="Icon Browse"
                                />
                                <span className='nav_icon_text'>Browse</span>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/updatespage" className="nav_icon_field nav-link">
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
                            {/* Avatar User */}
                            {/* <NavDropdown 
                                title={
                                    <img
                                    src = {ImgAsset.avatar}
                                    width="40"
                                    height="40"
                                    className="d-inline-block"
                                    alt="avatar"
                                    />
                                }
                                id="navbarScrollingDropdown" className="ml-auto">
                                    <NavDropdown.Item >Username User</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action3">Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Logout</NavDropdown.Item>
                            </NavDropdown> */}

                            {/* Login & Register Button */}
                            <Nav.Link href="/login">
                                <Button variant="outline-primary" className='Btn_Login'>Login</Button>{' '}
                            </Nav.Link>
                            <Nav.Link href="/register">
                                <Button variant="primary" className='Btn_Register'>Register</Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}