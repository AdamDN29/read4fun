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
                        <a class="lead" href="/story">StoryPage</a><br/>
                        <a class="lead" href="/chapter">ChapterPage</a><br/>
                        <a class="lead" href="/browse">BrowsePage</a><br/>
                        <a class="lead" href="/updates">UpdatesPage</a><br/>
                        <a class="lead" href="/author">AuthorPage</a><br/> 

                        <a class="lead" href="/dashboard">DashboardPage</a><br/>    
                        <a class="lead" href="/userstory">UserStoryPage</a><br/>    
                        <a class="lead" href="/editdetail">EditDetailPage</a><br/>    
                        <a class="lead" href="/editprofile">EditProfilePage</a><br/>    
                        <a class="lead" href="/changepassword">ChangePasswordPage</a><br/>    
                        <a class="lead" href="/writing">WritingPage</a><br/>    

                        <a class="lead" href="/policy">PolicyPage</a><br/>  
                        <a class="lead" href="/term_of_service">TermOfServicePage</a><br/>
                        <a class="lead" href="/about_us">AboutUsPage</a><br/>         
                        
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