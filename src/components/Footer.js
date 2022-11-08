import React from "react";
import '../css/footer.css'
import ImgAsset from '../resources'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// import { Icon } from "@iconify/react";
// import instagramFilled from "@iconify/icons-ant-design/instagram-filled";
// import facebookFilled from "@iconify/icons-ant-design/facebook-filled";
// import twitterFilled from "@iconify/icons-ant-design/twitter-circle-filled";

function Footer() {
  return (
    <>

    <footer className="footer">
      <Container className="mt-3">
                <Row xs={1} md={3}>
                  <Col> 
                    <Row > 
                      <Col className="link_field">
                        <div className="link_box">
                          <a href="/term_of_service"><p className="link_text">Term of Service</p></a>
                          <a href="/policy"><p className="link_text">Privacy Policy</p></a>
                          <a href="/about_us"><p className="link_text">About Us</p></a>
                        </div>
                        <div className="link_box">
                          <a href="/browse"><p className="link_text">Short Story</p></a>
                          <a href="/browse"><p className="link_text">Novel</p></a>
                        </div>
                        <div className="link_box">
                          <a href="/browse"><p className="link_text">Ranking</p></a>
                          <a href="/updates"><p className="link_text">Updates</p></a>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col> 
                    <center>
                      <div>
                        <img src = {ImgAsset.logo2}  alt="gambar" className="logo2"/>
                      </div>
                      <div className="allRightText" style={{ color: "#fff",  }}>
                        © 2022 | All Rights Reserved
                      </div>
                    </center>

                  </Col>
                  <Col className="order-last"> 
                    <div className="follow_us_field follow_us_field_in_xs">
                      
                      <center>
                      <p className="text_white"><center>Follow Us</center></p>
                      <Row className="justify-content-md-center">
                        <Col>
                          <center>
                            <a href="https://www.instagram.com/" target="_blank"><img src = {ImgAsset.ig_icon}  alt="gambar" className="icon_space"/></a>
                            <a href="https://twitter.com/" target="_blank"><img src = {ImgAsset.twitter_icon}  alt="gambar" className="icon_space"/></a>
                            <a href="https://www.facebook.com/" target="_blank"><img src = {ImgAsset.fb_icon}  alt="gambar" className="icon_space"/></a>
                            <a href="mailto: read4fun.developer@gmail.com"><img src = {ImgAsset.mail_icon}  alt="gambar" className="icon_space"/></a>
                          </center>
                        </Col>                       
                      </Row>
                      </center>
                    </div>
                  </Col>
                  
                </Row>                
                
      </Container>
      <Row className="dev_text"><center className='center_style'>Developed by STMJ MuWantap 2022</center></Row>
    </footer>



    
    
      {/* <div
        className="row mx-auto pt-5 pb-2 footer"
        style={{ backgroundColor: "#2A2E2E", width: "100%" }}
      >
              <Container className="mt-3">
                <Row>
                  <Col> Test
                  </Col>
                  <Col> Test
                  </Col>
                  <Col> Test
                  </Col>
                </Row> */}
                {/* <div className="list-footer-nav">
                  <ul>
                    <li>
                        <Row className="icon_space d-flex justify-space-between">
                          <Col >
                              <li>
                                <Link className="row_link footer-link" to="/about_us">About Us</Link>
                              </li>
                              <li>
                                <Link className="footer-link" to="/policy">Policy</Link>
                              </li>
                              <li>
                                <Link className="footer-link" to="/term_of_service">Terms</Link>
                              </li>
                          </Col>
                          <Col >
                          <li>
                                <Link className="row_link footer-link" to="/browse">Short Story</Link>
                              </li>
                              <li>
                                <Link className="footer-link" to="/browse">Novel</Link>
                              </li>
                          </Col>
                          <Col >
                            <li>
                                <Link className="footer-link" to="/updates">Updates</Link>
                              </li>
                              <li>
                                <Link className="footer-link" to="/browse">Ranking</Link>
                              </li>
                              
                          </Col>
                        </Row>
                    </li>
                  </ul>

                  <ul>
                    <center>
                    <li>
                      <img src = {ImgAsset.logo2}  alt="gambar" className="logo2"/>
                    </li>
                    <li style={{ color: "#fff" }}>
                      © 2022 | All Rights Reserved
                    </li>
                    </center>
                  </ul>

                  <ul>
                    <li>
                      <center><p className="footer-link">Follow Us</p></center>
                    </li>
                    <li className="icon_space d-flex justify-space-between">
                      <img src = {ImgAsset.ig_icon}  alt="gambar" className="icon_space"/>
                      <img src = {ImgAsset.twitter_icon}  alt="gambar" className="icon_space"/>
                      <img src = {ImgAsset.fb_icon}  alt="gambar" className="icon_space"/>
                      <img src = {ImgAsset.mail_icon}  alt="gambar" className="icon_space"/>

                    </li>
                  </ul>
                </div> */}
                {/* </Container> */}
      {/* </div>   */}
      
    </>
  );
}

export default Footer;
