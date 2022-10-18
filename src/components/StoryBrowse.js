import React from 'react';
import { useState, useEffect } from "react";
import ImgAsset from '../resources'
import '../css/storybrowse.css'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, ListGroup, Pagination } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from "axios";

function StoryBrowse() {
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
            <div>
                <Row xs={1} md={2} >
                    {Array.from({ length: 10 }).map((_, idx) => (
                        <Link className="link_chapter" to={`/storypage`}>
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
                                    <div className="detail_list2">
                                        <img
                                            width="16px"
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_type2}
                                        />
                                        <span className="icon_text2">Novel</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_status2}
                                        />
                                        <span className="icon_text2">Completed</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_chapter2}
                                        />
                                        <span className="icon_text2">472 Chapters</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_view2}
                                        />
                                        <span className="icon_text2">2.84 M</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_like2}
                                        />
                                        <span className="icon_text2">18.35 K</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_bookmark2}
                                        />
                                        <span className="icon_text2">145</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="16px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_update2}
                                        />
                                        <span className="icon_text2">2 days ago</span>
                                    </div>
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
    );
}

export default StoryBrowse;