import React from 'react';

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'

function ListPages() {
    return (
        <div>
        <Navbars/>
        <Container className="mt-3">
            <Row>
                <Col md="{60}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                        <h1>Development Pages</h1>
                        <p class="lead"><strong>Daftar Halaman</strong></p>
                        <a class="lead" href="/login">Login</a><br/>
                        <a class="lead" href="/register">Register</a><br/>
                        <a class="lead" href="/homepage">Homepage</a><br/>
                        <a class="lead" href="/storypage">StoryPage</a><br/>
                        <a class="lead" href="/chapterpage">ChapterPage</a><br/>
                        <a class="lead" href="/browsepage">BrowsePage</a><br/>
                        <a class="lead" href="/updatespage">UpdatesPage</a><br/>
                        <a class="lead" href="/authorpage">AuthorPage</a><br/>            
                        
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
        <Footer/>
        </div>
    );
}

export default ListPages;