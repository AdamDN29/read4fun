import React from "react";
import '../css/footer.css'
import ImgAsset from '../resources'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import { Icon } from "@iconify/react";
// import instagramFilled from "@iconify/icons-ant-design/instagram-filled";
// import facebookFilled from "@iconify/icons-ant-design/facebook-filled";
// import twitterFilled from "@iconify/icons-ant-design/twitter-circle-filled";
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div
        className="row mx-auto pt-5 pb-2 footer"
        style={{ backgroundColor: "#2A2E2E", width: "100%" }}
      >
        <div className="col-lg-12">
          <div className="nav-footer">
            <div className="row ">
              <div className="col-lg-12 ">
                <div className=" list-footer-nav">
                  

                  <ul>
                    
                    <li>
                        <Row >
                          <Col >
                              <li>
                                <Link className="footer-link" to="/">Updates</Link>
                              </li>
                              <li>
                                <Link className="footer-link" to="/">Ranking</Link>
                              </li>
                           
                          </Col>
                          <Col >
                          <li>
                                <Link className="row_link footer-link" to="/">Short Story</Link>
                              </li>
                              <li>
                                <Link className="footer-link" to="/">Novel</Link>
                              </li>
                          </Col>
                          <Col >
                          <li>
                                <Link className="row_link footer-link" to="/">About Us</Link>
                              </li>
                              <li>
                                <Link className="footer-link" to="/">Policy</Link>
                              </li>
                              
                          </Col>
                        </Row>
                      
                      
                    </li>
                    {/* <li>
                      <Link className="footer-link" to="/about">Ranking</Link>
                    </li> */}
              
                  </ul>

                  <ul className="pt-1">
                    <center>
                    <li>
                      <img src = {ImgAsset.logo2}  alt="gambar" className="logo2"/>
                    </li>
                    <li style={{ color: "#fff" }}>
                      © 2022 | All Rights Reserved
                    </li>

                    </center>
                    
                  </ul>

                  {/* <ul>
                    <li>
                      <p>Bantuan</p>
                    </li>
                    <li>Syarat dan Ketentuan</li>
                    <li>Kebijakan Privasi</li>
                  </ul> */}

                  {/* <ul>
                    <li>
                      <p>Kemitraan</p>
                    </li>
                    <li>Ajukan Kemitraan</li>
                    <li>Program Afiliasi</li>
                  </ul> */}

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
