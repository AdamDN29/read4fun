import React from 'react';
import { useState, useEffect } from "react";
import ImgAsset from '../resources'
import '../css/ranking.css'

//import component Bootstrap React
import { Spinner, Container, Row, Col , Tabs, Tab } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from "axios";

function Ranking() {
    const [storys, setStory] = useState([]);
    const [sortView, setSortView] = useState([]);
    const [sortLike, setSortLike] = useState([]);
    const [sortBookmark, setSortBookmark] = useState([]);

    const [key, setKey] = useState('most_view');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story`)
          .then((response) => {
            console.log(response);
            // setStory(response.data);
            const views = [...response.data].sort((a, b) => a.view - b.view);
            const likes = [...response.data].sort((a, b) => a.like - b.like);
            const bookmarks = [...response.data].sort((a, b) => a.bookmark - b.bookmark);
            setSortView(views);
            setSortLike(likes);
            setSortBookmark(bookmarks);
            setStory(views);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }, []);

    function selectTabs (k) {
        setKey(k);
        console.log(k);
        if (k === 'most_view'){
            setStory(sortView);
        }
        else if (k === 'most_like'){
            setStory(sortLike);
        }
        else if (k === 'most_bookmark'){
            setStory(sortBookmark);
        }
    }

    const showStory = storys.slice(0,15).map((story) => (  
        <Link className="link" 
            to={`/story/${story.title}`}
            state={{story_id: story.id}}>
            <Col>
                <Row className="story_link">
                    <Col md="auto" className="cover_ranking">
                        {story.link !== null ? (
                            <img src={story.link} alt="Cover" height="114px" width="76px"/>
                        ) : (
                            <img width="76px" height="114px" src={ImgAsset.image_placeholder} alt="Cover"/>
                        )} 
                    </Col>
                    <Col className='story_field'> 
                        <h6 className='stort_title'>{story.title}</h6>
                        <div className="detail_list2">
                            <img
                                width="14px"
                                height="14px"
                                className="detail_list_icon"
                                src = {ImgAsset.icon_type}
                            />
                            <span className="icon_text">{story.type}</span>
                        </div>
                        <div className="detail_list2">
                            <img
                                height="14px"
                                className="detail_list_icon"
                                src = {ImgAsset.icon_status}
                            />
                            <span className="icon_text">{story.status}</span>
                        </div>
                        {
                            key === 'most_view' ? (
                                <div className="detail_list2">
                                    <img
                                        className="detail_list_icon"
                                        src = {ImgAsset.icon_view}
                                    />
                                    <span className="icon_text">2.84 M</span>
                                </div>
                            ):(<></>)
                        }
                        {
                            key === 'most_like' ? (
                                <div className="detail_list2">
                                    <img
                                        className="detail_list_icon"
                                        src = {ImgAsset.icon_like}
                                    />
                                    <span className="icon_text">18.35 K</span>
                                </div>
                            ):(<></>)
                        }
                        {
                            key === 'most_bookmark' ? (
                                <div className="detail_list2">
                                    <img
                                        className="detail_list_icon"
                                        src = {ImgAsset.icon_bookmark}
                                    />
                                    <span className="icon_text">134</span>
                                </div>
                            ):(<></>)
                        }
                        
                    </Col>
                </Row>
            </Col>
        </Link>        
    ));

    return (
        <div>
            <Tabs
            activeKey={key}
            onSelect={selectTabs}
            id="justify-tab-example"
            className="mb-3"
            justify
            >
                <Tab eventKey="most_view" title="Most View" tabClassName="tabs_title">
                    {
                        isLoading === true ? (
                            <center>
                            <Spinner size="sm" animation="border" width="500px" height="500px"/> 
                            </center>
                        ):(<Row xs={1} md={3}> {showStory}</Row>)
                    }    
                </Tab>
                <Tab eventKey="most_like" title="Most Like" tabClassName="tabs_title">
                    <Row xs={1} md={3}> {showStory}</Row>
                </Tab>
                <Tab eventKey="most_bookmark" title="Most Bookmark" tabClassName="tabs_title">
                    <Row xs={1} md={3}> {showStory}</Row>
                </Tab>
            </Tabs>

            {/* <Row>
                <Col><p className='ranking_title'>Most View</p>
                    {sortView.slice(0,5).map((story) => (
                        <Link className="link" 
                        to={`/story/${story.title}`}
                        state={{story_id: story.id}}>
                            <Row className="story_link">
                                <Col md="auto">
                                    {story.link !== null ? (
                                        <img src={story.link} alt="Cover" height="114px" width="76px"/>
                                    ) : (
                                        <img width="76px" height="114px" src={ImgAsset.image_placeholder} alt="Cover"/>
                                    )} 
                                </Col>
                                <Col className='story_field'> 
                                    <h6 className='stort_title'>{story.title}</h6>
                                    <div className="detail_list2">
                                        <img
                                            width="14px"
                                            height="14px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_type}
                                        />
                                        <span className="icon_text">{story.type}</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="14px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_status}
                                        />
                                        <span className="icon_text">{story.status}</span>
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
                    {sortLike.slice(0,5).map((story) => (
                        <Link  to={`/storypage/${story.id}`}>
                            <Row className="story_link">
                                <Col md="auto"> 
                                    {story.link !== null ? (
                                        <img src={story.link} alt="Cover" height="114px" width="76px"/>
                                    ) : (
                                        <img width="76px" height="114px" src={ImgAsset.image_placeholder} alt="Cover"/>
                                    )}
                                </Col>
                                <Col className='story_field'> 
                                <h6 className='stort_title'>{story.title}</h6>
                                    <div className="detail_list2">
                                        <img
                                            width="14px"
                                            height="14px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_type}
                                        />
                                        <span className="icon_text">{story.type}</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="14px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_status}
                                        />
                                        <span className="icon_text">{story.status}</span>
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
                    {sortBookmark.slice(0,5).map((story) => (
                        <Link  to={`/storypage/${story.id}`}>
                            <Row className="story_link">
                                <Col md="auto"> 
                                    {story.link !== null ? (
                                        <img src={story.link} alt="Cover" height="114px" width="76px"/>
                                    ) : (
                                        <img width="76px" height="114px" src={ImgAsset.image_placeholder} alt="Cover"/>
                                    )}
                                </Col>
                                <Col className='story_field'> 
                                <h6 className='stort_title'>{story.title}</h6>
                                    <div className="detail_list2">
                                        <img
                                            width="14px"
                                            height="14px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_type}
                                        />
                                        <span className="icon_text">{story.type}</span>
                                    </div>
                                    <div className="detail_list2">
                                        <img
                                            height="14px"
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_status}
                                        />
                                        <span className="icon_text">{story.status}</span>
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
            </Row> */}
        </div>
    );
}

export default Ranking;