import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'
import axios from "axios";

import { Card, Col, Row, Spinner } from 'react-bootstrap'

import ImgAsset from '../resources';
import '../css/storycard.css';

function StoryGrid() {
    const [storys, setStory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/sort`)
          .then((response) => {
            let sortedStory = response.data.sort((a, b) => new Date(...b.chapter_update_at.split('/').reverse()) - new Date(...a.chapter_update_at.split('/').reverse()));
            // let sortedStory = response.data.sort((a, b) =>
            //     a.chapter_update_at.split('/').reverse().join().localeCompare(b.chapter_update_at.split('/').reverse().join())); 
            setStory(sortedStory);
            setIsLoading(false);
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }, []);

    return (
        <>
        {
          isLoading === true ? (
            <center>
              <Spinner size="sm" animation="border" width="500px" height="500px"/> 
            </center>
          ):
          (
            <Row xs={3} md={6} className="g-6">
            {storys.slice(0,12).map((story) => {
                // let date1 =new Date(story.updated_at).toDateString()
                let update;
                if(story.chapter_update_at !== null){
                    update = story.chapter_update_at;
                }else{update = story.updated_at}

                const date = update;					
                const dt = new Date(date)

                return (
                    <Link className="link" 
                    to={`/story/${story.id}`}
                    // state={{story_id: story.id}}
                    >
                    <Col className='story_col'>
                        <Card className="story_card card mx-1">
                            
                            {story.link !== null ? (
                                <div className="thumb-img-product d-flex justify-content-center align-items-center">             
                                <img className="card-img-top" src={story.link} alt="Cover" height="225px" width="150px"/>
                                </div>
                            ) : (
                                <img width="150px" height="225px" className="card-img-top" src={ImgAsset.image_placeholder} alt="Cover"/>
                            )}
                            {/* <Card.Img variant="top" src={story.thumbnail} /> */}
                            <Card.Body className="story_card_body card-body">
                            <Card.Title className="story_card_title card-title">{story.title}</Card.Title>
                            <Card.Text>
                                {/* type detail */}
                                <div className="detail_list">
                                    <img
                                        width="16px"
                                        height="16px"
                                        className="detail_list_icon"
                                        src = {ImgAsset.icon_type}
                                    />
                                    <span className="icon_text">{story.type}</span>
                                </div>

                                {/* update detail */}
                                <div className="detail_list">
                                    <img
                                        className="detail_list_icon"
                                        src = {ImgAsset.icon_update}
                                    />
                                    <span className="icon_text"><i><ReactTimeAgo date={dt} locale="en-US"/></i></span>
                                </div>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Link>
                )
            })}
            {/* {Array.from({ length: 12 }).map((_, idx) => (
                
            ))} */}
            </Row>
            )
        }
        </>
    );   
}

export default StoryGrid;