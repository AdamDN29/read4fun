import React from 'react';
import '../css/storypage.css'
import ImgAsset from '../resources';

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";

function StoryPage() {
    return (
        <div>
        <Navbars/>
        <Container className="mt-3">
            <Row className='info_section' >
                <Col >
                    <img
                        height="450px"
                        className="card-img-top"
                        src={ImgAsset.ssc1}
                        alt="Cover"
                    />
                </Col>

                <Col xs={5}>
                    <h2 className='story_title2'>Shadow Slave</h2>
                    <h4 className='section_title'><i>Author :</i> <a className='author_text'>Guiltythree</a></h4>
                    <Row className='row_detail'>
                        <Col className='col_detail'><p className='detail1'>Type</p>
                            <div className="detail_list3">
                                <img
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_type2}
                                />
                                <span className="icon_text">Short Story</span>
                            </div>
                        </Col>
                        <Col className='col_detail'><p className='detail1'>Status</p>
                            <div className="detail_list3">
                                <img
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_status2}
                                />
                                <span className="icon_text">Ongoing</span>
                            </div>
                        </Col>
                        <Col ><p className='detail1'>Chapters</p>
                            <div className="detail_list3">
                                <img
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_chapter2}
                                />
                                <span className="icon_text">472</span>
                            </div>
                        </Col>
                    </Row>

                    <Row className='row_detail'>
                        <Col className='col_detail'><p className='detail1'>Views</p>
                            <div className="detail_list3">
                                <img
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_view2}
                                />
                                <span className="icon_text">2.84 M</span>
                            </div>
                        </Col>
                        <Col className='col_detail'><p className='detail1'>Likes</p>
                            <div className="detail_list3">
                                <img
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_like2}
                                />
                                <span className="icon_text">18.35 K</span>
                            </div>
                        </Col>
                        <Col ><p className='detail1'>Bookmarks</p>
                            <div className="detail_list3">
                                <img
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_bookmark2}
                                />
                                <span className="icon_text">134</span>
                            </div>
                        </Col>
                    </Row>

                    <div className='row_detail'>
                        <h4 className='section_title2'><i>Genre</i></h4>
                        <Link to="/browsepage"><Badge bg="#B8D9A0" className='genre_badge' >Fantasy</Badge>{' '}</Link>
                        <Link to="/browsepage"><Badge bg="#B8D9A0" className='genre_badge' >Action</Badge>{' '}</Link>
                        <Link to="/browsepage"><Badge bg="#B8D9A0" className='genre_badge' >Adventure</Badge>{' '}</Link>
                        <Link to="/browsepage"><Badge bg="#B8D9A0" className='genre_badge' >Romance</Badge>{' '}</Link>
                        <Link to="/browsepage"><Badge bg="#B8D9A0" className='genre_badge' >Mystery</Badge>{' '}</Link>
                        <Link to="/browsepage"><Badge bg="#B8D9A0" className='genre_badge' >Magical Realism</Badge>{' '}</Link>
                        <Link to="/browsepage"><Badge bg="#B8D9A0" className='genre_badge' >Psychological</Badge>{' '}</Link>
                        {/* <Link to="/browsepage"><Badge bg="#B8D9A0" className='genre_badge' >Comedy</Badge>{' '}</Link> */}
                    </div>

                    <Button className='btn_sp'>Read First Chapter</Button>
                    <Button className='btn_sp'>Add to Bookmark</Button>
                    <Button className='btn_report btn_sp'>Report</Button>

                </Col>

                <Col >
                    <div className='like_section'>
                        <p className='like_question'>Like This Story ?</p>
                        <div className='like_icon_place'>

                        </div>
                        {/* <img
                            className="like_icon_place"
                            width="100px"
                            height="100px"
                            src = {ImgAsset.icon_like2}
                        /> */}
                    </div>
                    
                
                </Col>
            </Row>
            
        </Container>
        <Footer/>
        </div>
    );
}

export default StoryPage;