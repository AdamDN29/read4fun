import React from 'react';
import ImgAsset from '../resources';

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
                        <h1>PolicyPage</h1>
                        <p class="lead">Test PolicyPage <strong>Read4Fun</strong></p>
                        
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