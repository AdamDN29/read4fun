import React from 'react';
import ImgAsset from '../resources';
import '../css/DashboardUser.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import { useState, useEffect } from "react";
import axios from "axios";

//import component Bootstrap React
import { Card, Container, Row, Col , Button, CloseButton } from 'react-bootstrap'

function AuthorPage() {

    const [author, setAuthor] = useState([]);

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/1`)
          .then((response) => {
            setAuthor(response.data.data);
            console.log(response.data.data);
            
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);



      

    return (
        <div>
        <Navbars />   
        <Container className="mt-3">

            {/* Details User */}
            <Row className="Border">
                <Col md={"auto"} className='detailAvatar'>
                    <img
                    height="225px"
                    src = {ImgAsset.avatar}
                    />
                </Col>

                {/* <Col>
                    <Row className='title_area'>
                        <h2 className='username_user'>STMJ_MuWantap</h2>
                        <Button className='btn_editprofile'>Edit Profile</Button>
                    </Row>
                
                </Col> */}

                <Col> 
                    <Row>
                        <Col>
                            <h2 className='username_user'>STMJ_MuWantap</h2>
                        </Col>
                        <Col>
                            <Button className='btn_report_author btn_editprofile'>Report</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row>
                                <div className="detail_list3">
                                    <img
                                        width="25px"
                                        height="25px"
                                        className="detail_list_icon3"
                                        src = {ImgAsset.icon_email}
                                    />
                                    <span className="icon_text3">STMJ_MuWantap2022@gmail.com </span>
                                </div>
                            </Row>
                            <Row>
                                <div className="detail_list3">
                                    <img
                                        width="25px"
                                        height="25px"
                                        className="detail_list_icon3"
                                        src = {ImgAsset.icon_fullname}
                                    />
                                    <span className="icon_text3">STMJ MuWantap PPL 2</span>
                                </div>
                            </Row>
                            <Row>
                                <div className="detail_list3">
                                    <img
                                        width="25px"
                                        height="25px"
                                        className="detail_list_icon3"
                                        src = {ImgAsset.icon_birthdate}
                                    />
                                    <span className="icon_text3">01 Januari 2000</span>
                                </div>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <div className="detail_list3">
                                    <img
                                        width="25px"
                                        height="25px"
                                        className="detail_list_icon3"
                                        src = {ImgAsset.icon_occupation}
                                    />
                                    <span className="icon_text3">Student</span>
                                </div>
                            </Row>
                            <Row>
                                <div className="detail_list3">
                                    <img
                                        width="25px"
                                        height="25px"
                                        className="detail_list_icon3"
                                        src = {ImgAsset.icon_address}
                                    />
                                    <span className="icon_text3">Sumedang, West Java</span>
                                </div>
                            </Row>
                        </Col>
                    </Row>    
                </Col> 
            </Row>

            {/* Story Author */}
            <Row>
                {/* Story Author */}
                <Col>
                    <div className='userstory_box'>
                        <h2 className='userstory_title'>Author's Story</h2>
                        <div className="border_bottom detail_list3">
                            <img
                                width="25px"
                                height="25px"
                                className="detail_list_icon3"
                                src = {ImgAsset.book_updates}
                            />
                            <span className="icon_text3">2 Stories</span>
                        </div>
                        {/* Author Story List */}
                        <div className='list_Story_box'>
                            {/* Story Box */}
                            <Row className='story_box'>
                                <Col md="auto">
                                    <img
                                        // width="25px"
                                        height="225px"
                                        // className="detail_list_icon3"
                                        src = {ImgAsset.image_placeholder}
                                    />
                                </Col>
                                <Col>
                                    <Row>
                                        <h2 className='list_story_title'>Story of My Life</h2>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon4"
                                                        src = {ImgAsset.icon_type2}
                                                    />
                                                    <span className="size_s icon_text3">Novel</span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon4"
                                                        src = {ImgAsset.icon_status2}
                                                    />
                                                    <span className="size_s icon_text3">On Going</span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon4"
                                                        src = {ImgAsset.icon_chapter2}
                                                    />
                                                    <span className="size_s icon_text3">100 Chapters</span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon4"
                                                        src = {ImgAsset.icon_update2}
                                                    />
                                                    <span className="size_s icon_text3"><i>2 days ago</i></span>
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col >
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon4"
                                                        src = {ImgAsset.icon_view2}
                                                    />
                                                    <span className="size_s icon_text3">1,02 M</span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon4"
                                                        src = {ImgAsset.icon_like2}
                                                    />
                                                    <span className="size_s icon_text3">4,52 K</span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon4"
                                                        src = {ImgAsset.icon_bookmark2}
                                                    />
                                                    <span className="size_s icon_text3">79</span>
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                             {/* Story Box */}
                             <Row className='story_box'>
                                <Col md="auto">
                                    <img
                                        // width="25px"
                                        height="225px"
                                        // className="detail_list_icon3"
                                        src = {ImgAsset.image_placeholder}
                                    />
                                </Col>
                                <Col>
                                    <Row>
                                        <h2 className='list_story_title'>Story of My Life</h2>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon3"
                                                        src = {ImgAsset.icon_type2}
                                                    />
                                                    <span className="size_s icon_text3">Novel</span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon3"
                                                        src = {ImgAsset.icon_status2}
                                                    />
                                                    <span className="size_s icon_text3">On Going</span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon3"
                                                        src = {ImgAsset.icon_chapter2}
                                                    />
                                                    <span className="size_s icon_text3">100 Chapters</span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon3"
                                                        src = {ImgAsset.icon_update2}
                                                    />
                                                    <span className="size_s icon_text3"><i>2 days ago</i></span>
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon3"
                                                        src = {ImgAsset.icon_view2}
                                                    />
                                                    <span className="size_s icon_text3">1,02 M</span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon3"
                                                        src = {ImgAsset.icon_like2}
                                                    />
                                                    <span className="size_s icon_text3">4,52 K</span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="detail_list3">
                                                    <img
                                                        width="20px"
                                                        height="20px"
                                                        className="detail_list_icon3"
                                                        src = {ImgAsset.icon_bookmark2}
                                                    />
                                                    <span className="size_s icon_text3">79</span>
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    
                </Col>

            </Row>
                   
            
        </Container>
        <Footer />   
        </div>
    );
}

export default AuthorPage;