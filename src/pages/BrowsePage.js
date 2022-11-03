import React from 'react';
import ImgAsset from '../resources';
import '../css/browsepage.css';
import '../css/storybrowse.css'
import { scroller } from "react-scroll";
import ReactTimeAgo from 'react-time-ago'

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import StoryBrowse from '../components/StoryBrowse'
import Pagination from "../components/Pagination";

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Form, FloatingLabel, InputGroup  } from 'react-bootstrap'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GoTopButton from '../components/GoTopButton';
import { useScroll } from "../helper/scroll";

// Scroll to Section
const scrollToSection = (flag) => {
    scroller.scrollTo(flag, {
      duration: 100,
      offset:-25,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

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
    const [query, setQuery] = useState("");    
    console.log(query);

    const [storys, setStory] = useState([]);
    
    // Pagination Settings
    const [allSessionsCount, setallSessionsCount] = useState(1);
    const [sessionsPerPage, setSessionsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const scrollPosition = useScroll();
    console.log("Current Page : ", currentPage)

    const lastSessionNumber = currentPage * sessionsPerPage;
    const firstSessionIndex = lastSessionNumber - sessionsPerPage;

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/search?query=${query}`)
          .then((response) => {
            setStory(response.data);
            console.log("Total Data: ", response.data.length);
            setallSessionsCount(response.data.length);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

	const onSearchHandler = (e) => {
		e.preventDefault();
        console.log(query);
        if( e !== null || e !== ""){
            setQuery(query);
            console.log("apply :", query);
            browseStory(query);
        }else{
            return;
        }
	};

    function browseStory (query){
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/search?query=${query}`)
          .then((response) => {
            setStory(response.data);
            console.log("Total Data: ", response.data.length);
            setallSessionsCount(response.data.length);
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
        });
        setCurrentPage(1);
    }

    // Scroll to Section
    const temp = () => {
        scrollToSection("result");
      }

    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            {/* Search Section */}
            <div className='info_section2'> 
                <h1 className='section_title3'>Search</h1>

                <Form onSubmit={onSearchHandler}>
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
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                />
                                {/* <InputGroup.Text id="basic-addon2"><Button className='btn_search2'>Search</Button></InputGroup.Text> */}
                            </InputGroup>
                        </Col>
                        <Col xs='1'> <Button type="submit" className='btn_search2' onClick={temp} >Search</Button> </Col>
                    </Row>
                </Form>
           </div>

             {/* Filter Section */}
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
                    <Button className='btn_apply' onClick={temp}>Apply Filter</Button>
                </div>
                </Row>
                            
           </div>

            {/* Story Section */}
            <div className='info_section2' id="result"> 
                {/* <h1 className='section_title3'>Result</h1> */}
                {/* <StoryBrowse querys={apply}/> */}

                <div>
                <Row xs={1} md={2} >
                    {/* {Array.from({ length: 10 }).map((_, idx) => ( */}
                    {storys
                        .slice(firstSessionIndex,lastSessionNumber)
                        .map((story) => {
                        const date = story.updated_at					
                        const dt = new Date(date)

                        return(
                        // <Link className="link" 
                        // to={`/story/${story.title}`}
                        // state={{story_id: story.id}}>
                        <Link className="link" 
                            to={`/story/${story.title}`}
                            state={{story_id: story.id}}>
                            <Col>
                            <Row className="story_row">
                                <Col xs md="auto"> 
                                {
                                    story.link !== null ?(
                                        <img width="175px" height="250px" src={story.link} className="cover_updates" alt="Cover"/>
                                    ):(
                                        <img width="175px" height="250px" src={ImgAsset.image_placeholder} className="cover_updates" alt="Cover"/>
                                    )
                                }
                                </Col>
                                <Col md="auto" className='story_field2'> 
                                    <h6 className='stort_title2'>{story.title}</h6>
                                    <div className="detail_list2">
                                        <img
                                            width="16px"
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_type2}
                                        />
                                        <span className="icon_text2">{story.type}</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_status2}
                                        />
                                        <span className="icon_text2">{story.status}</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_chapter2}
                                        />
                                        <span className="icon_text2">{story.chapter} Chapters</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_view2}
                                        />
                                        <span className="icon_text2">
                                            { story.view !== null ? (
                                                <>{story.view}</>
                                                ):(<>1</>)
                                            }
                                        </span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_like2}
                                        />
                                        <span className="icon_text2">
                                            { story.like !== null ? (
                                                <>{story.like}</>
                                                ):(<>1</>)
                                            }
                                        </span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_bookmark2}
                                        />
                                        <span className="icon_text2">
                                            { story.bookmark !== null ? (
                                                <>{story.bookmark}</>
                                                ):(<>1</>)
                                            }
                                        </span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_update2}
                                        />
                                        <span className="icon_text2"><ReactTimeAgo date={dt} locale="en-US"/></span>
                                    </div>
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
                        flagScroll = "2"
                    />
                </div>
                <GoTopButton visible={scrollPosition > 400} />
            </div>
            
          
            
        </Container>
        <Footer />   
        </div>
    );
}

export default BrowsePage;