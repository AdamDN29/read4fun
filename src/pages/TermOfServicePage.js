import React from 'react';
import ImgAsset from '../resources';

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'

function TermOfServicePage() {
    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            <Row>
                <Col md="{60}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                        <h1>TermOfServicePage</h1>
                        <p class="lead">Test TermOfServicePage <strong>Read4Fun</strong></p>
                        
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
        <Footer />   
        </div>
    );
}

export default TermOfServicePage;