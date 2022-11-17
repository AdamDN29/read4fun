import React from 'react';
import ImgAsset from '../resources';
import '../css/AboutUs.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'

function AboutUsPage() {
    return (
        <div>
        <Navbars />   
        <Container  className="mt-3" >
            <Row>
                    <Card className="cardAbouUs border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                        <h1 className="title">About Us</h1>
                        </Card.Body>
                    </Card>
            </Row>

            <Row>
                <Col xs={7} >
                <Row>
                <h6 className="title-low">Our</h6>
                <h3 className="title">Goal Statement</h3>
                &emsp;<h5 className="description"><strong>Read4Fun</strong> Website-based application creation and development,This platform has a goal which is to provide facilities in the form of a platform to provide
                insight, information, and entertainment and can also pour various ideas into a story and can also be one of the means
                in providing readings with nuances that fit the category we choose.<br></br><br></br>
                A platform that can provide readers / authors to create their own stories and can be read by various people around the world. As is
                 This platform is expected to make it easier for people, both teenagers and adults, to express their interest in writing and reading.
                </h5>
                </Row>
                <Row>
                <img src={ImgAsset.Our_Value} alt="value" style={{width: '70rem', height: '70rem'}}/>
                </Row>
                </Col>
            <Col xs={4} >
                <h3 className="middle-des">Team Developper</h3>
                <h5 className="middle-des">This were the team developer who were the owner of this website-based application</h5>
                    <Col> 
                        <center><Col xs={6} className="middle">
                        <center><img src={ImgAsset.Rafiq} alt="Scrum Master" style={{width: 150, borderRadius: 150/ 2}}/></center>
                        <p className="textdev"><strong>Muhammad Rafiq<br></br> Scrum Master</strong></p>
                        </Col></center>

                        <center><Col xs={6} className="middle">
                        <center><img src={ImgAsset.Adam} alt="Developper" style={{width: 150, borderRadius: 150/ 2}}/></center>
                        <p className="textdev"><strong>Adam Din Naufan <br></br> Developer</strong></p>
                        </Col></center>

                        <center><Col xs={6} className="middle">
                        <center><img src={ImgAsset.Bagas} alt="Developper" style={{width: 150, borderRadius: 150/ 2}}/></center>
                        <p className="textdev"><strong>Bagas Adi Firdaus <br></br> Developer</strong></p>
                        </Col></center>

                        <center><Col xs={6} className="middle">
                        <center><img src={ImgAsset.Chandra} alt="Developper" style={{width: 150, borderRadius: 150/ 2}}/></center>
                        <p className="textdev"><strong>Chandra Wijaya <br></br> Developer</strong></p>
                        </Col></center>

                        <center><Col xs={6} className="middle">
                        <center><img src={ImgAsset.Andre} alt="Developper" style={{width: 150, borderRadius: 150/ 2}}/></center>
                        <p className="textdev"><strong>Andre Luckyta F <br></br> Developer</strong></p>
                        </Col></center>



                    </Col> 

            </Col>
    </Row>




        <Row>
            
      
        
        </Row> 
        </Container>
        <Footer />   
        </div>
    );
}

export default AboutUsPage;