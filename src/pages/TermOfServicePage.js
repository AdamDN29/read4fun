import React from 'react';
import ImgAsset from '../resources';
import '../css/TermOfServicePage.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'

function TermOfServicePage() {
    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            <Row>
                <Col md="{60}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                        <h1 className="title">Term Of Service</h1>
                        <p class="lead">TERMS AND CONDITIONS OF USE OF WEBSITES AND SERVICES OF <strong>Read4Fun</strong></p><br></br>
                        <h2 className="title-low">1.BINDING EFFECT.</h2>
                        <p>This is a legally binding agreement. By using the Site or any Services provided in connection 
                            with the Site, you agree to abide by these Terms of Use, as they may be amended by Company from 
                            time to time in its sole discretion and without specific notice to you. Company will post a notice on 
                            the Site any time these Terms of Use have been changed or otherwise updated. It is your responsibility 
                            to review these Terms of Use periodically, and if at any time you find these Terms of Use unacceptable, 
                            you must immediately leave the Site and cease all use of the Service and the Site. This Agreement constitutes 
                            the entire and only agreement between us and you, and supersedes all prior or contemporaneous agreements, 
                            representations, warranties and understandings with respect to the Site, the content, products or services 
                            provided by or through the Site, and the subject matter of this Agreement.
                        </p><br></br>
                        <h2 className="title-low">2. USER IN ALL AGE.</h2>
                        <p>
                            Anyone who hasitate to read/write story were able to use this site as reference or having fun, and please notes
                            that when u make a post of a story or post a comment make sure not to using violation and apreciate everyone 
                            in order to make peaceful places for reader and writer.
                        </p><br></br>
                        <h2 className="title-low">3. DESCRIPTION OF SITES AND SERVICES.</h2>
                        <p>The Company operates online reading services website that accompany such story services.</p><br></br>
                        <h2 className="title-low">4. YOUR OBLIGATIONS</h2>
                        <p>By registering or using the Sites and Services in any way, you agree to the following:</p>
                        <h6>
                          &emsp; &emsp; a. You agree not to harass or threaten other players;<br></br>
                          &emsp; &emsp; b. You agree not to use any harmful, threatening, abusive, defamatory, obscene, hateful, racially or ethnically offensive language; <br></br>
                          &emsp; &emsp; c. You agree not to impersonate any Staff Member, including any Forum Moderators<br></br>
                          &emsp; &emsp; d. If asked by a member of Staff to stop or change a behavior or action, you will do so;<br></br>
                         &emsp;  &emsp; e. You agree not to open multiple accounts with the Service;<br></br>
                          &emsp; &emsp; f. You agree not to transmit or make available in the Service or Site any advertising, promotional materials or any other forms of solicitation;<br></br>
                          &emsp; &emsp; g. You agree not to transmit any material that contains viruses, worms, traps or malicious computer code;<br></br>
                          &emsp; &emsp; h. You agree not to disrupt the normal flow of the story and comment, or otherwise act in a manner that negatively affects other people’s ability to use the Service;<br></br>
                          &emsp; &emsp; i. You agree not to collect or store personal data about other people using the Service;<br></br>
                          &emsp; &emsp; j. You agree not to use any <strong>Read4Fun</strong> trademark, service mark or tradename, or any variation or misspelling thereof, in Your domain name(s) or any other part of Your<br></br>&emsp;&emsp;&emsp; Universal Record Locator (URL).<br></br>
                          &emsp; &emsp; k. You also agree to our Website and Forum Rules as listed here: <a href="/Policy">Policy . </a> <br></br>
                        </h6><br></br>
                        <h2 className="title-low">5. PROHIBITED USES.</h2>
                        <p>Company imposes certain restrictions on your permissible use of the Site and the Service. You are prohibited from violating or 
                            attempting to violate any security features of the Site or Service, including, without limitation,<br></br></p>
                          <h6> &emsp; &emsp; a. You agree not to harass or threaten other players;accessing content or data not intended for you, 
                            or logging <br></br>&emsp; &emsp;onto a server or account that you are not authorized to access;<br></br>
                            &emsp; &emsp; b.  attempting to probe, scan, or test the vulnerability of the Service, the Site, 
                            or any associated system or <br></br>&emsp; &emsp;network, or to breach security or authentication measures without proper authorization;<br></br>
                            &emsp; &emsp; c. interfering or attempting to interfere with service to any user, host, or network, including, without limitation, <br></br>&emsp; &emsp;by means of 
                            submitting a virus to the Site or Service, overloading, “flooding,” “spamming,” “mail bombing,” or<br></br>&emsp; &emsp;“crashing;”   <br></br>
                            &emsp; &emsp; d. using the Site or Service to send unsolicited e-mail, including, without limitation, promotions, or <br></br>&emsp; &emsp;advertisements for products or services;  <br></br>
                            &emsp; &emsp; e. forging any TCP/IP packet header or any part of the header information in any e-mail or in any posting using <br></br>&emsp; &emsp;the Service;<br></br>
                            &emsp; &emsp; f. attempting to modify, reverse-engineer, decompile, disassemble, or otherwise reduce or attempt to reduce to <br></br>&emsp; &emsp;a human-perceivable form any of the 
                            source code used by Company in providing the Site or Service. Any <br></br>&emsp; &emsp;violation of system or network security may subject you to civil and/or criminal liability.<br></br>
</h6> 

                        



                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
        <Footer />   
        </div>
    );
}

export default TermOfServicePage;