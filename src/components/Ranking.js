import React from 'react';
import { useState, useEffect } from "react";
import ImgAsset from '../resources'
import '../css/ranking.css'
import GetLike from '../hook/GetLike';
import GetBookmark from '../hook/GetBookmark';

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
            const views = [...response.data].sort((a, b) => b.view - a.view);
            const likes = [...response.data].sort((a, b) => b.like - a.like);
            const bookmarks = [...response.data].sort((a, b) => b.bookmark - a.bookmark);
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

    const showStory = storys.slice(0,15).map((story) => {

        return (  
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
                                <div>          
                                    <div className="detail_list2">
                                        <img
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_view}
                                        />
                                        <span className="icon_text">
                                            {story.view !== null ?(story.view):("1")} View
                                        </span>
                                    </div>
                                </div>
                            ):(<></>)
                        }
                        {
                            key === 'most_like' ? (
                                <div>          
                                    <div className="detail_list2">
                                        <img
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_like}
                                        />
                                        <span className="icon_text">
                                            <GetLike key={story.id} story_id={story.id} /> Like
                                        </span>
                                    </div>
                                </div>
                            ):(<></>)
                        }
                        {
                            key === 'most_bookmark' ? (
                                <div>          
                                    <div className="detail_list2">
                                        <img
                                            className="detail_list_icon"
                                            src = {ImgAsset.icon_bookmark}
                                        />
                                        <span className="icon_text">
                                            <GetBookmark key={story.id} story_id={story.id} /> Bookmark
                                        </span>
                                    </div>
                                </div>
                            ):(<></>)
                        }
                        
                    </Col>
                </Row>
            </Col>
        </Link>        
    )});

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

           
        </div>
    );
}

export default Ranking;