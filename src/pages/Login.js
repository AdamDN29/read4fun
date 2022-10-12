import React from 'react';

//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'

function Login() {
    return (
        <Container className="mt-3">
            <Row>
                <Col md="{60}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                        <h1>Login</h1>
                        <p class="lead">Test Login<strong>Read4Fun</strong></p>
                        
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    );
}

export default Login;