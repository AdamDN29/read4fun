import React from 'react';

import ImgAsset from '../resources'
import '../css/homepage.css'

//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

//import components
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import ImgCarousel from '../components/ImgCarousel'
import StoryCard from '../components/StoryCard';
import Ranking from '../components/Ranking';
import StoryGrid from '../components/StoryGrid';

function Homepage() {
    return (
        <div>
        <Navbars/>
        <Container className="mt-3">

            <ImgCarousel/>

            {/* Short Story Section  */}
            <div className='section_header'>
                <h1 className='story_type'>Short Story</h1>
                <Link to="/browse" className='more_link'>View More</Link>

                <StoryCard/>
            </div>

            {/* Short Story Section  */}
            <div className='section_header'>
                <h1 className='story_type'>Novel</h1>
                <Link to="/browse" className='more_link'>View More</Link>
                
                <StoryCard/>
            </div>

            {/* Write Section */}
            <Card className="write_card border-0 rounded shadow-sm">
                <Card.Body className="write_card_body p-4">
                    <h1 className='write_card_title'>Want to Write a Story ?</h1>
                    <Button variant="primary" href="/" className='btn_writes'>
                        <img
                        className='write_card_icon'
                        src = {ImgAsset.icon_write_story}
                        />{'    '}
                        <span>  Write a Story</span>
                    </Button>      
                </Card.Body>
            </Card> 

            {/* Ranking Section  */}
            <div className='section_header'>
                <h1 className='story_type'>Ranking</h1>
                <Link to="/browse" className='more_link'>View More</Link>
               
                <Ranking/>
            </div>           
           
             {/* Updates Section  */}
             <div className='section_header'>
                <h1 className='story_type'>Recently Updates</h1>
                <Link to="/updates" className='more_link'>View More</Link>
               
                <StoryGrid/>
            </div>  
 
            
        </Container>
        <Footer/>
        </div>
    );
}

export default Homepage;