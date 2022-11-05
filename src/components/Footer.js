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
    
      <div
        className="row mx-auto pt-5 pb-2 footer"
        style={{ backgroundColor: "#2A2E2E", width: "100%" }}
      >
              <Container>
                <div className="list-footer-nav">
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
                      {/* <Icon
                        icon={instagramFilled}
                        style={{ color: "#d6efc7", fontSize: "19px" }}
                      />
                      <Icon
                        icon={facebookFilled}
                        style={{ color: "#d6efc7", fontSize: "19px" }}
                      />
                      <Icon
                        icon={twitterFilled}
                        style={{ color: "#d6efc7", fontSize: "19px" }}
                      /> */}
                    </li>
                  </ul>
                </div>
                </Container>
      </div>  
    </>
  );
}

export default Footer;
