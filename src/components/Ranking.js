import React from 'react';
import { useState, useEffect } from "react";
import ImgAsset from '../resources'
import '../css/ranking.css'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from "axios";

function Ranking() {
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
            <Row>
                <Col><p className='ranking_title'>Most View</p>
                    {storys.slice(0,5).map((story) => (
                        <Link  to={`/storypage/${story.id}`}>
                            <Row className="story_link">
                                <Col xs lg="3"> 
                                    <img
                                    width="76px"
                                    height="114px"
                                    src={ImgAsset.ssc1}
                                    alt="Cover"
                                    />
                                </Col>
                                <Col className='story_field'> 
                                    <h6 className='stort_title'>Shadow Slave</h6>
                                    <div className="detail_list2">
                                        <img
                                            width="14px"
                                            height="14px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_type}
                                        />
                                        <span className="icon_text">Novel</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="14px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_status}
                                        />
                                        <span className="icon_text">Completed</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_view}
                                        />
                                        <span className="icon_text">2.84 M</span>
                                    </div>
                                </Col>
                            </Row>
                        </Link>
                    ))}               
                </Col>

                <Col><p className='ranking_title'>Most Like</p>
                    {storys.slice(0,5).map((story) => (
                        <Link  to={`/storypage/${story.id}`}>
                            <Row className="story_link">
                                <Col xs lg="3"> 
                                    <img
                                    width="76px"
                                    height="114px"
                                    src={ImgAsset.ssc1}
                                    alt="Cover"
                                    />
                                </Col>
                                <Col className='story_field'> 
                                    <h6 className='stort_title'>Shadow Slave</h6>
                                    <div className="detail_list2">
                                        <img
                                            width="14px"
                                            height="14px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_type}
                                        />
                                        <span className="icon_text">Novel</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="14px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_status}
                                        />
                                        <span className="icon_text">Completed</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_like}
                                        />
                                        <span className="icon_text">18.35 K</span>
                                    </div>
                                </Col>
                            </Row>
                        </Link>
                    ))}                   
                </Col>

                <Col><p className='ranking_title'>Most Bookmark</p>
                    {storys.slice(0,5).map((story) => (
                        <Link  to={`/storypage/${story.id}`}>
                            <Row className="story_link">
                                <Col xs lg="3"> 
                                    <img
                                    width="76px"
                                    height="114px"
                                    src={ImgAsset.ssc1}
                                    alt="Cover"
                                    />
                                </Col>
                                <Col className='story_field'> 
                                    <h6 className='stort_title'>Shadow Slave</h6>
                                    <div className="detail_list2">
                                        <img
                                            width="14px"
                                            height="14px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_type}
                                        />
                                        <span className="icon_text">Novel</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="14px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_status}
                                        />
                                        <span className="icon_text">Completed</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_bookmark}
                                        />
                                        <span className="icon_text">134</span>
                                    </div>
                                </Col>
                            </Row>
                        </Link>
                    ))}                
                </Col>
            </Row>
        </div>
    );
}

export default Ranking;