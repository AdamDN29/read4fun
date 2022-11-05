import React, {useState} from 'react';
import '../css/changepasswordpage.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import axios from "axios";
import Swal from 'sweetalert2'

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap'

function ChangePasswordPage() {
	const localData = sessionStorage.getItem("token");

    const [password, setPassword] = useState("");
    const [newPassword, setNewpassword] = useState("");
    const [newConfirmpassword, setNewconfirmpassword] = useState("");
    
    const passwordHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('current_password', password);
        formData.append('new_password', newPassword);

        axios
        .create({
            headers: {
              Authorization : `Bearer ${sessionStorage.getItem("token")}`
              }
            })
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/change-password`, formData)
        .then((response) => {
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Password Changed!',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#21c177',
                preConfirm: () => {
                    window.location.href = "/editprofile";
                }	  
            }) 	  
        })
        .catch((error) => {
            Swal.fire({
				icon: 'error',
				title: 'Change Password Failed.',
				allowOutsideClick: false,
				allowEscapeKey: false,
				confirmButtonColor: '#D3455B',
			}) 
            console.log(error)
			return;
        })
    };

    return (
        <div>
            <Navbars />
            <Container className="mt-3">
                <Card className="change_password card mx-1">
                    <Card.Body className="change_password_body card-body">
                        <Card.Title className="title card-title">Change Password</Card.Title>
                        <Form className='form_change_password' onSubmit={passwordHandler}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="label_form">Current Password</Form.Label>
                                <Form.Control type="password" placeholder="*********************" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="label_form">New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter New Password" name='password' value={newPassword} onChange={(e) => setNewpassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="label_form">Confirm New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Confirm New Password" name='password' value={newConfirmpassword} onChange={(e) => setNewconfirmpassword(e.target.value)} />
                            </Form.Group>

                            <Row>
                                <Col >
                
                                </Col>
                                <Col md="auto">
                                    <Button href='/editprofile' variant="primary" className="btn_back" >
                                        Back
                                    </Button>
                                    <Button variant="danger" className="btn_change" type="submit">
                                        Change Password
                                    </Button>     
                                </Col>
                            </Row>
                            {/* <Row className="btn_group">
                                <Col md="auto" className="btn_to_right">
                                    
                                </Col>
        
                            </Row> */}
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </div>
    );
}

export default ChangePasswordPage;