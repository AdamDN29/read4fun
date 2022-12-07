import React, {useState} from 'react';
import '../css/changepasswordpage.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import axios from "axios";
import Swal from 'sweetalert2'

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap'

function ChangePasswordPage() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewpassword] = useState("");
    const [newConfirmpassword, setNewconfirmpassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const passwordHandler = async (e) => {
        if(newPassword !== newConfirmpassword){
            Swal.fire({
				icon: 'warning',
				title: 'New Password Confirmation Incorrect.',
                text: "New Password and New Password Confirmation must match",
				allowOutsideClick: false,
				allowEscapeKey: false,
				confirmButtonColor: '#D3455B',
			}) 
            return;
        }

        setIsLoading(true);
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
            setIsLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Password Changed!',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: "#B8D9A0",
                preConfirm: () => {
                    window.location.href = "/editprofile";
                }	  
            }) 	  
        })
        .catch((error) => {
            setIsLoading(false);
            Swal.fire({
				icon: 'error',
				title: 'Change Password Failed.',
                text: error.response.data.error,
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
                                <Form.Control type="password" placeholder="*********************" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="label_form">New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter New Password" name='password' value={newPassword} onChange={(e) => setNewpassword(e.target.value)} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="label_form">Confirm New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Confirm New Password" name='password' value={newConfirmpassword} onChange={(e) => setNewconfirmpassword(e.target.value)} required/>
                            </Form.Group>

                            <Row>
                                <Col >
                
                                </Col>
                                <Col md="auto">
                                    <Button href='/editprofile' variant="primary" className="btn_back" >
                                        Back
                                    </Button>
                                    <Button variant="danger" disabled={isLoading} className="btn_change" type="submit">
                                        {
                                            isLoading === false ? (<>Change Password</>)
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