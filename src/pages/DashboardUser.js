import React from 'react';
import ImgAsset from '../resources';

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'

function DashboardUser() {
    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
             {/* Details Section */}
             {/* 
             
             
             AUTHOR
             
             
             */}

             <Row className="Border">
                <Col md="{60}">
                    <Card className="border-0 rounded shadow-sm">
                    
                    </Card>
                </Col>

                <Col className='detail'>
                <img
                height="200px"
                paddingLeft="-150px"
                src = {ImgAsset.avatar}
                />
                </Col>

                <Col className='detail_genre1'>
                <Row>
                    <Col>
                    <h2 className='user_name'>STMJ MuWantap</h2>
                    </Col>
                    
                    <Col className='Report'>
                    <Button variant="primary" className='Btn_Edit'>Edit Profile</Button>
                    </Col>
                </Row>
              
                    <Row>
                <img
                className='book_icon'
                src={ImgAsset.icon_chapter}
                />
                <h2 className='detail_genre'>STMJ_MuWantap2022@gmail.com</h2>
                </Row>
                <Row>
                <img
                className='book_icon'
                src={ImgAsset.icon_chapter}
                />
                <h2 className='detail_genre'>STMJ (Optional)</h2>
                </Row>
                <Row>
                <img
                className='book_icon'
                src={ImgAsset.icon_chapter}
                />
                <h2 className='detail_genre'>01 Januari 2000</h2>
                    </Row>
                
                </Col>

                <Col className='detail_genre2'>
                <Row>
                <img
                className='book_icon'
                src={ImgAsset.icon_chapter}
                />
                <h2 className='detail_genre'>Student</h2>
                </Row>
                <Row>
                <img
                className='book_icon'
                src={ImgAsset.icon_chapter}
                />
                <h2 className='detail_genre'>Sumedang, West Java</h2>
                </Row>
                </Col>
            </Row>
           

                       {/* 
             
             
             AUTHOR STORY
             
             
             */}


 
       
       
    <Col md="{20}">
            <div className="BookmarksField">
           <h1 className="text-gede">BOOKMARKS</h1> 

           <Row className="Border-Bookmarks">
            <h4>Shadow Slave</h4>
            <h6>1 days ago</h6>

           </Row>

           <Row className="Border-Bookmarks">
            <h4>The Begining After The EndShadow Slave</h4>
            <h6>2 days ago</h6>
           </Row>
        </div>
     </Col>   


        <Col md="{12,20}">
        <Row className="col-story">
                <Row className="Row_Auth_Story">
                <Card>
                   
                <Row className="Border">
                    <Col>
                    <img
                    
                    className='book_icon1'
                    src={ImgAsset.icon_status}
                    />
                    </Col>
                    <Col><h2 className='detail_genre3'>5 Story</h2></Col>
                    <Col md="{60}">
                    <Button variant="primary" className='Btn_addstory'>Add Story</Button>
                    </Col>

                </Row>
                <Row className>
                    <Col className="AuthStory">
                        <img 
                        height="250px"
                        className="card-img-left"
                        src={ImgAsset.ssc1}
                        />

                    </Col>
                    <Col xs={10} className='row_detail'>
                            

                            
                <Row className='row_detail2'>
                    <h2 className='title'>Shadow Slave</h2>
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

                    <Row className='row_detail3'>
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
                    
                    <Row className='row_detail2'>
                        <h2 className='title'>Shadow Slave</h2>
                        <Col className='col_detail'><p className='detail1'>Type</p>
                            <div className="detail_list3">
                                <img
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_type2}
                                />
                                <span className="icon_text">Short Story</span>
                            </div>
                        </Col>
                        <Col className='col_detail3'><p className='detail1'>Status</p>
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

                    <Row className='row_detail3'>
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





                    <Row className='row_detail2'>
                        <h2 className='title'>Shadow Slave</h2>
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

                    <Row className='row_detail3'>
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



                    <Row className='row_detail2'>
                        <h2 className='title'>Shadow Slave</h2>
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

                    <Row className='row_detail3'>
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



                    <Row className='row_detail2'>
                        <h2 className='title'>Shadow Slave</h2>
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

                    <Row className='row_detail3'>
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





                    </Col>
                </Row>
                
                </Card>
    </Row>
           </Row>
        </Col>
   
    
    
                   
            
        </Container>
        <Footer />   
        </div>
    );
}

export default DashboardUser;