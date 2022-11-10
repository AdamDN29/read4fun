import React from 'react';
import ImgAsset from '../resources';
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import Pagination from "../components/Pagination";
import ListChapter from '../components/ListChapter';
import { scrollToTop } from "../helper/scroll";

import { useState, useEffect } from "react";
import '../css/storybrowse.css'
import '../css/updatespage.css'

//import component Bootstrap React
import { Spinner, Container, Row, Col , Button, ListGroup, Badge} from 'react-bootstrap'
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
    const [isLoading, setIsLoading] = useState(true);

    // Pagination Settings
    const [allSessionsCount, setallSessionsCount] = useState(1);
    const [sessionsPerPage, setSessionsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    console.log("Current Page : ", currentPage)

    const lastSessionNumber = currentPage * sessionsPerPage;
    const firstSessionIndex = lastSessionNumber - sessionsPerPage;

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/sort`)
          .then((response) => {
            setStory(response.data);
            console.log("Total Data: ", response.data.length);
            setallSessionsCount(response.data.length);
            console.log(response);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
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
                        {
                            isLoading === true ? (
                                <center>
                                    <Spinner size="lg" animation="border" width="500px" height="500px"/> 
                                    <p className='loadingtext'>Loading ...</p>
                                </center>
                            ):
                            (
                            <Row xs={1} md={2} >
                            {storys
                                .slice(firstSessionIndex,lastSessionNumber)
                                .map((story) => {

                                return(
                                    <Link key={story.id} className="link_chapter" 
                                        to={`/story/${story.title}`}
                                        state={{story_id: story.id}}
                                    >
                                    
                                        <Col>
                                            <Row className="story_row">
                                                <Col xs md='auto'> 
                                                {
                                                    story.link !== null ?(
                                                        <img width="175px" height="250px" src={story.link} className="cover_updates" alt="Cover"/>
                                                    ):(
                                                        <img width="175px" height="250px" src={ImgAsset.image_placeholder} className="cover_updates" alt="Cover"/>
                                                    )
                                                }
                                                    
                                                </Col>
                                                <Col md="6" className='story_field2'> 
                                                    <h6 className='s_title stort_title2'>{story.title}</h6>

                                                    {/* List Chapter */}

                                                    {
                                                        <ListChapter key={story.id} story_id={story.id} />
                                                    }

                                                    
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Link>
                                )})}
                            </Row>
                            )
                        }
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