import React from 'react';
import ImgAsset from '../resources';
import '../css/editprofilepage.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Form, InputGroup } from 'react-bootstrap'

function EditProfilePage() {
    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
        <Card className="edit_detail card mx-1">
                <Card.Body className="edit_detail_body card-body">
                    <Row>
                        <Col md='10'>
                        <Card.Title className="edit_detail_title card-title">Edit Profile</Card.Title>
                        </Col>
                        <Col md='2'>
                        <button>Change Password</button>
                        </Col>
                    </Row>
                        <Row>
                            {/* Upload Cover */}
                            <Col xs={3} className="upload_col">
                               
                                <img
                                    
                                    src={ImgAsset.avatar2}
                                    alt="Photo Profil"
                                    height="225px"
                                />
                                <InputGroup size="md" className="upload_form mb-3">
                                    <InputGroup.Text id="basic-addon1" className='icon_upload'>
                                        <img
                                            src = {ImgAsset.icon_upload}
                                        />
                                    </InputGroup.Text>
                                    <Form.Control
                                    placeholder="Enter Link of Story Cover"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    />
                                    <Form.Text id="passwordHelpBlock" muted>
                                        Please enter a valid link of your cover story
                                    </Form.Text>
                                    {/* <InputGroup.Text id="basic-addon2"><Button className='btn_search2'>Search</Button></InputGroup.Text> */}
                                </InputGroup>
                            </Col>

                            {/* Edit Detail */}
                            <Col>
                                <Form className='form_detail'>
                                    {/* Story Title Form */}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Story Title</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Story Title" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Story Title</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Story Title" /> 
                                    </Form.Group>
                                    <Button href='/userstory' variant="primary" className="btn_back" >
                                        Back
                                    </Button>
                                    <Button variant="primary"  className="btn_save" type="submit">
                                        Save Detail
                                    </Button>
                                    
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