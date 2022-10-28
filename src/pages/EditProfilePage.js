import React from 'react';
import ImgAsset from '../resources';
import '../css/editprofilepage.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap'

function EditProfilePage() {
    return (
        <div>
            <Navbars />
            <Container className="mt-3">
                <Card className="edit_profile card mx-1">
                    <Card.Body className="edit_profile_body card-body">
                        <Row>
                            <Col md='10'>
                                <Card.Title className="title card-title">Edit Profile</Card.Title>
                            </Col>
                            <Col md='2'>
                                <Button href='/changePassword' className="btn_password">Change Password</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3} className="upload_section">
                                <img
                                    src={ImgAsset.avatar2}
                                    alt="Photo Profil"
                                    height="225px"
                                    className="upload_picture"
                                />
                                <InputGroup size="md" className="upload_link mb-3">
                                    <InputGroup.Text id="basic-addon1" className='upload_icon'>
                                        <img
                                            src={ImgAsset.icon_upload}
                                        />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Enter Link of Your Profile Picture"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                    <Form.Text id="passwordHelpBlock" muted>
                                        Please enter a valid link of your profile picture
                                    </Form.Text>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form className='form_edit_profile'>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Username</Form.Label>
                                        <Form.Control type="text" placeholder="STMJ_MUWANTAP" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Nama</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Birthday</Form.Label>
                                        <Form.Control type="date" placeholder="" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Occupation</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Occupation" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Address</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Address" />
                                    </Form.Group>
                                    <Row className="btn_group">
                                        <Col>
                                            <Button variant="primary" className="btn_save" type="submit">
                                                Save Profile
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button href='/dashboard' variant="primary" className="btn_back" >
                                                Back
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

            </Container>
            <Footer />
        </div>
    );
}

export default EditProfilePage;