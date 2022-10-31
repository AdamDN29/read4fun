import React from 'react';
import ImgAsset from '../resources';
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import Pagination from "../components/Pagination";
import { scrollToTop } from "../helper/scroll";

import { useState, useEffect } from "react";
import '../css/storybrowse.css'
import '../css/updatespage.css'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, ListGroup, Badge} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";
import axios from "axios";

// Scroll to Section
const scrollToSection = (flag) => {
    scroller.scrollTo(flag, {
      duration: 100,
      offset:-25,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

function UpdatesPage() {
    const [storys, setStory] = useState([]);

    // Pagination Settings
    const [allSessionsCount, setallSessionsCount] = useState(1);
    const [sessionsPerPage, setSessionsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    console.log("Current Page : ", currentPage)

    const lastSessionNumber = currentPage * sessionsPerPage;
    const firstSessionIndex = lastSessionNumber - sessionsPerPage;

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story`)
          .then((response) => {
            setStory(response.data);
            console.log("Total Data: ", response.data.length);
            setallSessionsCount(response.data.length);
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      const temp = () => {
        scrollToSection("title");
      }
    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
                       
                <h1 className="titlepage" id="title">Recently Updates</h1>
                    <div>
                        <div>
                            <Row xs={1} md={2} >
                            {storys
                                .slice(firstSessionIndex,lastSessionNumber)
                                .map((story) => {
                                
                                return(
                                    <Link className="link_chapter" 
                                        to={`/story/${story.title}`}
                                        state={{story_id: story.id}}
                                    >
                                    
                                        <Col>
                                            <Row className="story_row">
                                                <Col xs md={4}> 
                                                    <img
                                                    src={ImgAsset.ssc1}
                                                    className="cover_story"
                                                    alt="Cover"
                                                    />
                                                </Col>
                                                <Col md="6" className='story_field2'> 
                                                    <h6 className='s_title stort_title2'>{story.title}</h6>


                                                    <Row className='row_chapter'>
                                                        <Col><Link to="/chapter"><Badge bg="#B8D9A0" className='genre_badge' >Chapter 100</Badge>{' '}</Link>
                                                        </Col>
                                                        <Col className='time_detail'><span className="time_detail icon_text2">2 days ago</span>
                                                        </Col>
                                                    </Row>
                                                    <Row className='row_chapter'>
                                                        <Col><Link to="/chapter"><Badge bg="#B8D9A0" className='genre_badge' >Chapter 99</Badge>{' '}</Link>
                                                        </Col>
                                                        <Col className='time_detail'><span className="time_detail icon_text2">7 days ago</span>
                                                        </Col>
                                                    </Row>
                                                    <Row className='row_chapter'>
                                                        <Col><Link to="/chapter"><Badge bg="#B8D9A0" className='genre_badge' >Chapter 98</Badge>{' '}</Link>
                                                        </Col>
                                                        <Col className='time_detail'><span className="time_detail icon_text2">12 days ago</span>
                                                        </Col>
                                                    </Row>
                                                    <Row className='row_chapter'>
                                                        <Col><Link to="/chapter"><Badge bg="#B8D9A0" className='genre_badge' >Chapter 97</Badge>{' '}</Link>
                                                        </Col>
                                                        <Col className='time_detail'><span className="time_detail icon_text2">15 days ago</span>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Link>
                                )})}
                            </Row>
                        </div>
                        <div className='pagination'>
                                <Pagination
                                    itemsCount={allSessionsCount}
                                    itemsPerPage={sessionsPerPage}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    alwaysShown={false}
                                    flagScroll = "1"
                                />
                        </div>
                    </div>       
               
        </Container>
        <Footer />   
        </div>
    );
}

export default UpdatesPage;