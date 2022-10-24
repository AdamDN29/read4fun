import React from 'react';
import ImgAsset from '../resources';
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

import { useState, useEffect } from "react";
import '../css/storybrowse.css'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, ListGroup, Badge, Pagination } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from "axios";



function UpdatesPage() {
    const [storys, setStory] = useState([]);

    useEffect(() => {
        axios
          .get(`https://dummyjson.com/products`)
          .then((response) => {
            setStory(response.data.products);
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);


    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            <Row>
                <Col md="{60}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                        <h1>Recently Updates</h1>
                         <div>
            <div>
                <Row xs={1} md={2} >
                    {Array.from({ length: 10 }).map((_, idx) => (
                        <Link className="link_chapter" to={`/story`}>
                            <Col>
                            <Row className="story_row">
                                <Col xs md={4}> 
                                    <img
                                    src={ImgAsset.ssc1}
                                    className="cover_story"
                                    alt="Cover"
                                    />
                                </Col>
                                <Col md="auto" className='story_field2'> 
                                    <h6 className='stort_title2'>Shadow Slave</h6>


                    <Row>
                                    <Col><Link to="/browse"><Badge bg="#B8D9A0" className='genre_badge' >Chapter 100</Badge>{' '}</Link>
                                    </Col>
                                    <Col><span className="icon_text2">2 days ago</span>
                                    </Col>
                    </Row>
                    <Row>
                        <Col><Link to="/browse"><Badge bg="#B8D9A0" className='genre_badge' >Chapter 99</Badge>{' '}</Link>
                        </Col>
                        <Col><span className="icon_text2">7 days ago</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col><Link to="/browse"><Badge bg="#B8D9A0" className='genre_badge' >Chapter 98</Badge>{' '}</Link>
                        </Col>
                        <Col><span className="icon_text2">12 days ago</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col><Link to="/browse"><Badge bg="#B8D9A0" className='genre_badge' >Chapter 97</Badge>{' '}</Link>
                        </Col>
                        <Col><span className="icon_text2">15 days ago</span>
                        </Col>
                    </Row>


                                   



                                </Col>
                            </Row>
                            </Col>
                        </Link>
                    ))}
                </Row>
            </div>
            <div className='pagination'>
                    <Pagination size="md">
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
        </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
        <Footer />   
        </div>
    );
}

export default UpdatesPage;