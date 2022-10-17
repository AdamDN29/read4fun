import React from 'react';
import ImgAsset from '../resources';
import '../css/browsepage.css';

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Form, FloatingLabel, InputGroup  } from 'react-bootstrap'

const genres = [
    {id: 1, label: 'Action'},
    {id: 2, label: 'Adventure'},
    {id: 3, label: 'Comedy'},
    {id: 4, label: 'Drama'},
    {id: 5, label: 'Fantasy'},
    {id: 6, label: 'Historical'},
    {id: 7, label: 'Horror'},
    {id: 8, label: 'Magical Realism'},
    {id: 9, label: 'Martial Arts'},
    {id: 10, label: 'Mature'},
    {id: 11, label: 'Mystery'},
    {id: 12, label: 'Psychological'},
    {id: 13, label: 'Romance'},
    {id: 14, label: 'Real Experience'},
    {id: 15, label: 'Sci-Fi'},
    {id: 16, label: 'School Life'},
    {id: 17, label: 'Slice of Life'},
    {id: 18, label: 'Sports'},
    {id: 19, label: 'Supernatural'},
    {id: 20, label: 'Tragedy'},
    {id: 21, label: 'Video Games'},
];


function BrowsePage() {
    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            {/* Search Section */}
            <div className='info_section2'> 
                <h1 className='section_title3'>Search</h1>
                <Row>
                    <Col >
                        <InputGroup size="lg" className="search_form mb-3">
                            <InputGroup.Text id="basic-addon1">
                                <img
                                    src = {ImgAsset.icon_search}
                                />
                            </InputGroup.Text>
                            <Form.Control
                            placeholder="Search any Story"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                            {/* <InputGroup.Text id="basic-addon2"><Button className='btn_search2'>Search</Button></InputGroup.Text> */}
                        </InputGroup>
                    </Col>
                    <Col xs={1}> <Button className='btn_search2'>Search</Button> </Col>
                </Row>
           </div>

             {/* Search Section */}
             <div className='info_section2'> 
                <Row>
                    <Col >
                        <Row >
                            <div className='row_detail'>
                                <h4 className='section_title4'>Type</h4>
                                <Button className='btn_active btn_filter'>All</Button>
                                <Button className='btn_filter'>Short Story</Button>
                                <Button className='btn_filter'>Novel</Button>
                            </div>
                        </Row>
                        <Row>
                            <div className='row_detail'>
                                <h4 className='section_title4'>Status</h4>
                                <Button className='btn_active btn_filter'>All</Button>
                                <Button className='btn_filter'>Ongoing</Button>
                                <Button className='btn_filter'>Completed</Button>
                            </div>
                        </Row>
                        <Row>
                            <div className='row_detail'>
                                <h4 className='section_title4'>Sort By</h4>
                                <Button className='btn_active btn_filter'>Most View</Button>
                                <Button className='btn_filter'>Most Like</Button>
                                <Button className='btn_filter'>Most Bookmark</Button>
                                <Button className='btn_filter'>Update</Button>
                            </div>
                        </Row>
                        
                    </Col>
                    <Col > 
                        <h4 className='section_title4'>Genre</h4>
                        <Row>
                            <Col> 
                                {genres.slice(0,7).map((genre) => (               
                                        <Form.Check 
                                        type="checkbox"
                                        id={`${genre.id}`}
                                        label={`${genre.label}`}
                                        className='form_check'
                                        />
                                    )
                                )}
                            </Col>
                            <Col> 
                                {genres.slice(7,14).map((genre) => ( 
                                        <Form.Check 
                                        type="checkbox"
                                        id={`${genre.id}`}
                                        label={`${genre.label}`}
                                        className='form_check'
                                        />
                                    )
                                )}   
                            </Col>
                            <Col> 
                                {genres.slice(14,21).map((genre) => (
                                        <Form.Check 
                                        type="checkbox"
                                        id={`${genre.id}`}
                                        label={`${genre.label}`}
                                        className='form_check'
                                        />
                                    )
                                )}   
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
                <Row>
                <div align="right">
                    <Button className='btn_apply'>Apply Filter</Button>
                </div>
                </Row>
                
                
           </div>
            
            {/* <Row>
                <Col md="{60}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                        <h1>BrowsePage</h1>
                        <p class="lead">Test BrowsePage <strong>Read4Fun</strong></p>
                        
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}
            
        </Container>
        <Footer />   
        </div>
    );
}

export default BrowsePage;