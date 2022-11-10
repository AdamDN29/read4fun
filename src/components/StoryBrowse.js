import React from 'react';
import { useState, useEffect } from "react";
import ImgAsset from '../resources'
import '../css/storybrowse.css'
import ReactTimeAgo from 'react-time-ago'

//import component Bootstrap React
import { Card, Container, Row, Col , Badge, ListGroup, Pagination } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from "axios";

const allGenres = [
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
                                    genres.map((genre) => {
                                        var array = [...allGenres]; 
                                        var index = array.indexOf(genre.genre_id)
                                        return(
                                        <Badge bg="#B8D9A0" className='genre_badge2' >{allGenres[index]}</Badge>
                                    )})
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