import React, { useEffect, useState } from 'react';

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
    const [userId, setUserId] = useState(() => {
		const localData = sessionStorage.getItem("id");
		return localData ? localData : null;
	});

    var isLoggedIn = false;
    var link_btn = '/login'

    if(userId !== null){
		var isLoggedIn = true;
        var link_btn = '/dashboard'
	}

    return (
        <div>
        <Navbars/>
        <Container className="mt-3">

            <ImgCarousel key={1} link_btn={link_btn}/>

            {/* Short Story Section  */}
            <div className='section_header'>
                <h1 className='story_type'>Short Story</h1>
                <Link className="more_link" 
                    to={`/browse/Short Story`}
                    // state={{link_query: 'Short Story'}}
                >View More</Link>

                <StoryCard key={1} type_story="short story"/>
            </div>

            {/* Novel Section  */}
            <div className='section_header'>
                <h1 className='story_type'>Novel</h1>
                <Link className="more_link" 
                    to={`/browse/Novel`}
                    // state={{link_query: 'Novel'}}
                >View More</Link>
                
                <StoryCard key={2} type_story="novel"/>
            </div>

            {/* Write Section */}
            <Card className="write_card border-0 rounded shadow-sm">
                <Card.Body className="write_card_body p-4">
                    <h1 className='write_card_title'>Want to Write a Story ?</h1>

                    <Button variant="primary" href={link_btn} className='btn_writes'>
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
                <Link className="more_link" 
                    to={`/browse/Ranking`}
                    state={{link_query: ""}}
                >View More</Link>
               
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