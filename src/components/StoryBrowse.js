import React from 'react';
import { useState, useEffect } from "react";
import ImgAsset from '../resources'
import '../css/storybrowse.css'
import ReactTimeAgo from 'react-time-ago'

//import component Bootstrap React
import { Card, Container, Row, Col , Badge, ListGroup, Pagination } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from "axios";

function StoryBrowse(props) {
    const story = props.storys;

    const date = story.updated_at					
    const dt = new Date(date)

    const [genres, setGenre] = useState([]);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getGenre/${story.id}`)
          .then((response) => {
            setGenre(response.data);
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    return (
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
                <Col className='story_field2'> 
                    <Row><h6 className='stort_title2'>{story.title}</h6></Row>

                    <Row>
                        <Col>
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
                                <span className="icon_text2">
                                    { story.chapter !== null ? (
                                        <>{story.chapter}</>
                                        ):(<>0</>)
                                    }  Chapters   
                                </span>
                            </div>
                                                
                            <div className="detail_list2">
                                <img
                                    height="16px"
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_update2}
                                />
                                <span className="icon_text2"><i><ReactTimeAgo date={dt} locale="id"/></i></span>
                            </div>
                        </Col>
                        <Col >
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
                                    } Views
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
                                    } Likes
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
                                    } Bookmarks
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <Row><h6 className='genre_title_text'>Genre</h6> </Row>
                    <Row>
                        <Col>
                        {
                            genres.length === 0 ? (
                                <p className='p_note'><i>Genre not set</i></p>
                            ):(
                                <>
                                {
                                    genres.map((genre) => (
                                        <Badge bg="#B8D9A0" className='genre_badge2' >{genre.genre_name}</Badge>
                                    ))
                                }
                                </>
                            )
                        }
                            

                            {/* <Badge bg="#B8D9A0" className='genre_badge2' >Fantasy</Badge>
                            <Badge bg="#B8D9A0" className='genre_badge2' >Fantasy</Badge>
                            <Badge bg="#B8D9A0" className='genre_badge2' >Fantasy</Badge>
                            <Badge bg="#B8D9A0" className='genre_badge2' >Fantasy</Badge>
                            <Badge bg="#B8D9A0" className='genre_badge2' >Fantasy</Badge> */}
                        </Col>      
                    </Row>                 
                </Col>                          
            </Row>
        </Col>
    );
}

export default StoryBrowse;