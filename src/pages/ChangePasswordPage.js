import React from 'react';
import ImgAsset from '../resources';
import '../css/changepasswordpage.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap'

function ChangePasswordPage() {
    return (
        <div>
            <Navbars />
            <Container className="mt-3">
                <Card className="change_password card mx-1">
                    <Card.Body className="change_password_body card-body">
                        <Card.Title className="title card-title">Change Password</Card.Title>
                        <Form className='form_change_password'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="label_form">Current Password</Form.Label>
                                <Form.Control type="password" placeholder="*********************" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="label_form">New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter New Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="label_form">Confirm New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Confirm New Password" />
                            </Form.Group>
                            <Row className="btn_group">
                                <Col>
                                    <Button variant="danger" className="btn_change" type="submit">
                                        Change Password
                                    </Button>
                                </Col>
                                <Col>
                                    <Button href='/editprofile' variant="primary" className="btn_back" >
                                        Back
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </div>
    );
}

export default ChangePasswordPage;