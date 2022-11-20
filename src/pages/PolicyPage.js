import React from 'react';
import ImgAsset from '../resources';
import '../css/PolicyPage.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'

function PolicyPage() {
    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            <Row>
                <Col md="{60}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                        <h1 className="title">Privacy Policy</h1>
                        <h4 className="description"> Effective Date September 04,2022 </h4>
                        <h3 className="title-low">Our Privacy Policy: </h3>
                        <p className="description">&#x2022;&emsp;explains the information we collect when you use our Services <br></br>
                                            &#x2022;&emsp;how we may use or share your information <br></br>
                                             &#x2022;&emsp;how you can control your information <br></br>
                                             &#x2022;&emsp;Applies to all Short Story, Novel,  and services 
                                             regardless of how you use or access them <br></br><br></br>
                        You must accept the Privacy Policy and <a href="/term_of_service">Terms of Service </a>in full to use 
                        <strong> Read4Fun </strong>Properties. This policy only covers our Services. 
                        It does not apply to third party partners, vendors, or service 
                        providers you may interact with while using our Services.  
                        If you have concerns about providing information to <strong>Read4Fun </strong>
                        or its use as described in this Privacy Policy, please contact us 
                        via our <a href="mailto: read4fun.developer@gmail.com"> Support Site </a>. If you object to anything described in this Privacy Policy, 
                        please do not use our Properties. <br></br><br></br>
                        
                        Using, accessing, playing, or interacting with our Services will be treated as an 
                        agreement to the collection and use of your information in accordance with this 
                        Privacy Policy; acceptance of this Privacy Policy and the 
                        <a href="/term_of_service">Terms of Service </a> in 
                        effect at the time of use; consent to the use of your data for marketing purposes 
                        by <strong>Read4Fun </strong>and its  <a href="/About_Us">business affiliates as described below. </a>
                        <br></br><br></br>
                        We may change this policy at any time; we will post any alterations or updates to this 
                        privacy statement. We may post additional notifications across our websites or send 
                        direct notifications. Please check the policy frequently; your continued use of our 
                        websites will be treated as acceptance of these changes from their effective date.
                        </p>
                        <h1>Privacy Policy: Important Points</h1>
                        <p className="description">This is a summary of the most important points of our 
                        Privacy Policy.  It is important to read the full document. It takes 
                        priority if there are any misunderstandings or questions about the policy.
                        <br></br>
                        &#x2022;&emsp;Personal information can identify you. It is important to 
                        protect it. It includes your real name, home and email addresses, and 
                        phone number.<br></br>
                        &#x2022;&emsp;We collect some information about how you use our sites.<br></br>
                        &#x2022;&emsp;We collect some information about your computer,
                        including IP address, unique device IDs, and hardware information 
                        to trouble shoot bugs, crashes, and assist with account issues.<br></br>
                        &#x2022;&emsp;We collect and store some of the information you give us. 
                        We use it to operate and improve our websites.<br></br>
                        &#x2022;&emsp;We do not keep your information longer than we need to.<br></br>
                        &#x2022;&emsp;You can ask us to stop collecting your information whenever 
                        you want. If you do not want us to collect your information, you may not be 
                        able to use some parts of our sites.<br></br>
                        &#x2022;&emsp;We use your information to run our sites to send you news, and to help you with issues<br></br>
                        &#x2022;&emsp;We will collect an email address during account creation.<br></br>
                        &#x2022;&emsp;We may record what you or other people say, and review it to 
                        help keep you or other people safe.<br></br>
                        &#x2022;&emsp;Sometimes we get information from other companies, or share your info with them. 
                        We may use it with the information we collect. You can turn off our ability to 
                        get this information.<br></br>
                        &#x2022;&emsp;If you have any questions about this policy, write to us using this <a href="mailto: read4fun.developer@gmail.com">Contact</a>.<br></br>
                  
                        </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
        <Footer />   
        </div>
    );
}

export default PolicyPage;