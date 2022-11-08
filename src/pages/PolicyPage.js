import React from 'react';
import ImgAsset from '../resources';
import '../css/PolicyPage.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'

function PolicyPage() {
    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            <Row>
                <Col md="{60}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                        <h1 className="title">Privacy Policy</h1>
                        <h4 className="description-"> Effective Date September 04,2022 </h4>
                        <h3 className="title-low">Our Privacy Policy: </h3>
                        <h4 className="description-">&#x2022; explains the information we collect when you use our Services <br></br>
                                            &#x2022;how we may use or share your information <br></br>
                                             &#x2022;how you can control your information <br></br>
                                             &#x2022;Applies to all Short Story, Novel,  and services 
                                             regardless of how you use or access them <br></br><br className="mid">
                        You must accept the Privacy Policy and Terms of Service in full to use 
                        Read4Fun Properties. This policy only covers our Services. 
                        It does not apply to third party partners, vendors, or service 
                        providers you may interact with while using our Services.  
                        If you have concerns about providing information to Read4Fun 
                        or its use as described in this Privacy Policy, please contact us 
                        via our Support Site. If you object to anything described in this Privacy Policy, 
                        please do not use our Properties.</br>
                        
                        
                        
                        </h4>
                        
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
        <Footer />   
        </div>
    );
}

export default PolicyPage;