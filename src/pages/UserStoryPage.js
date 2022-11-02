import React from 'react';
import '../css/storypage.css'
import ImgAsset from '../resources';

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Badge, Pagination, Form, FloatingLabel } from 'react-bootstrap';
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function UserStoryPage() {
    const [story, setStory] = useState([]);
    const [author, setAuthor] = useState([]);
    const [chapters, setChapter] = useState([]);

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/1`)
          .then((response) => {
            setStory(response.data);
            console.log(response.data);

            axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/${response.data.user_id}`)
            .then((response) => {
                setAuthor(response.data.data);
                console.log(response.data.data);
            })
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            {/* Details Section */}
            <Row className='info_section' >
                {/* Story Cover */}
                <Col md='auto'>
                    <img
                        height="450px"
                        className="cover_img card-img-top"
                        src={ImgAsset.ssc1}
                        alt="Cover"
                    />
                </Col>

                <Col md={5}>
                    <h2 className='story_title2'>{story.title}</h2>
                    <h4 className='section_title'><i>Author :</i> <a href="/dashboard" className='author_text'>{author.username}</a></h4>

                    {/* Detail */}
                    <Row className='row_detail'>
                        <Col className='col_detail'><p className='detail1'>Type</p>
                            <div className="detail_list3">
                                <img
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_type2}
                                />
                                <span className="icon_text">{story.type}</span>
                            </div>
                        </Col>
                        <Col className='col_detail'><p className='detail1'>Status</p>
                            <div className="detail_list3">
                                <img
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_status2}
                                />
                                <span className="icon_text">{story.status}</span>
                            </div>
                        </Col>
                        <Col ><p className='detail1'>Chapters</p>
                            <div className="detail_list3">
                                <img
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_chapter2}
                                />
                                <span className="icon_text">{story.chapter}</span>
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
                                <span className="icon_text">
                                    { story.view !== null ? (
                                        <>{story.view}</>
                                        ):(<>1</>)
                                    }
                                </span>
                            </div>
                        </Col>
                        <Col className='col_detail'><p className='detail1'>Likes</p>
                            <div className="detail_list3">
                                <img
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_like2}
                                />
                                <span className="icon_text">
                                    { story.like !== null ? (
                                        <>{story.like}</>
                                        ):(<>1</>)
                                    }
                                </span>
                            </div>
                        </Col>
                        <Col ><p className='detail1'>Bookmarks</p>
                            <div className="detail_list3">
                                <img
                                    className="detail_list_icon"
                                    src = {ImgAsset.icon_bookmark2}
                                />
                                <span className="icon_text">
                                    { story.bookmark !== null ? (
                                        <>{story.bookmark}</>
                                        ):(<>1</>)
                                    }
                                </span>
                            </div>
                        </Col>
                    </Row>
                    {/* Genre */}
                    <div className='row_detail'>
                        <h4 className='section_title2'><i>Genre</i></h4>
                        <Link to="/browse"><Badge bg="#B8D9A0" className='genre_badge' >Fantasy</Badge>{' '}</Link>
                        <Link to="/browse"><Badge bg="#B8D9A0" className='genre_badge' >Action</Badge>{' '}</Link>
                        <Link to="/browse"><Badge bg="#B8D9A0" className='genre_badge' >Adventure</Badge>{' '}</Link>
                        <Link to="/browse"><Badge bg="#B8D9A0" className='genre_badge' >Romance</Badge>{' '}</Link>
                        <Link to="/browse"><Badge bg="#B8D9A0" className='genre_badge' >Mystery</Badge>{' '}</Link>
                        <Link to="/browse"><Badge bg="#B8D9A0" className='genre_badge' >Magical Realism</Badge>{' '}</Link>
                        <Link to="/browse"><Badge bg="#B8D9A0" className='genre_badge' >Psychological</Badge>{' '}</Link>
                        {/* <Link to="/browsepage"><Badge bg="#B8D9A0" className='genre_badge' >Comedy</Badge>{' '}</Link> */}
                    </div>

                    {/* Button */}
                    <Button href="/editdetail" className='btn_sp'>Edit Detail</Button>
                    <Button href="/writingpage" className='btn_sp'>Add New Chapter</Button>
                    <Button className='btn_report btn_sp'>Delete Story</Button>
                </Col>


                {/* Like */}
                <Col >
                    {/* <div className='like_section'>
                        <p className='like_question'>Like This Story ?</p>
                        <div className='like_icon_place'>
                        </div>
                        <img
                            className="like_icon_place"
                            width="100px"
                            height="100px"
                            src = {ImgAsset.icon_like2}
                        />
                    </div> */}
                </Col>
            </Row>
            
            {/* Description Section */}
           <div className='info_section'> 
                <h1 className='section_title3'>Description</h1>
                
                <div className='content_field2'>
                    <span className='desc_content'>{story.description}</span>
                </div>
           </div>
            
            {/* Chapters Section */}
           <div className='info_section'> 
                <h1 className='section_title3'>Chapters</h1>
                <p> <i>You can edit and delete your story chapter by click the story chapter you want</i></p>
                <div className='release_content'>Latest Release : <a className='latest_chapter'>{" "} Chapter 472 : Quid Pro Quo </a>
                        <img
                            className="icon_sort"
                            src = {ImgAsset.icon_sort}
                        />
                </div>

                <div>
                    <Row xs={1} md={2} className="g-4">
                        {Array.from({ length: 10 }).map((_, idx) => (
                            <Link className="link_chapter" to={`/storypage`}>
                                <Col>
                                <Card className='chapter_card'>
                                    <Card.Body className='chapter_card_body'>
                                    <Card.Title>
                                        <Row>
                                            <Col xs={2} className='number_chapter'> 1
                                            </Col>
                                            <Col className='title_chapter'> Nightmare Begin
                                            </Col>
                                            {/* <Col className='title_chapter'> 
                                                <Button variant="primary" className="btn_delete">
                                                    <img
                                                        className="icon_delete"
                                                        src = {ImgAsset.icon_delete}
                                                    />
                                                </Button>
                                            </Col> */}
                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        <Row>
                                            <Col xs={2}> 
                                            </Col>
                                            <Col className='date_chapter'> 8 months ago
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                                </Col>
                            </Link>
                        ))}
                    </Row>
                </div>
                <div className='pagination'>
                    <Pagination size="md">
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>

           </div>

           {/* Comments Section */}
            <div className='info_section'> 
                <h1 className='section_title3'>Comments</h1>
                <div className='comment_field'>
                    
                    <Row>
                        <Col xs={1} > 
                            <img
                                className='avatar_place'
                                src = {ImgAsset.avatar2}
                            />
                        </Col>
                        <Col > 
                            <div className='comment_form'>
                                {/* Not Logged In */}
                                {/* <p>You Must Be Logged In to Comment</p>
                                <Button className='btn_comment_form'>Login</Button> */}

                                {/* Logged In */}
                                <>
                                <FloatingLabel
                                    controlId="floatingTextarea"
                                    label="Comment"
                                    className="mb-3"
                                >
                                    <Form.Control as="textarea" placeholder="Leave a comment here" />
                                </FloatingLabel>
                                <Button className='btn_comment_form'>Post Comment</Button>
                                </>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className='release_content'>3 Comments  </div>

                <div className='comment_field2'>
                    
                    <Row>
                        <Col xs={1} > 
                            <img
                                className='avatar_place'
                                src = {ImgAsset.avatar2}
                            />
                        </Col>
                        <Col > 
                            <p className='comment_username'>Weaver the Demon of Fate</p>
                            <p className='comment_date'>5 months ago</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}></Col>
                        <Col > 
                            <p className='comment_content'>This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!!</p>
                           
                        </Col>
                    </Row>
                </div>

                <div className='comment_field2'>
                    
                    <Row>
                        <Col xs={1} > 
                            <img
                                className='avatar_place'
                                src = {ImgAsset.avatar2}
                            />
                        </Col>
                        <Col > 
                            <p className='comment_username'>Weaver the Demon of Fate</p>
                            <p className='comment_date'>5 months ago</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}></Col>
                        <Col > 
                            <p className='comment_content'>This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!!</p>
                           
                        </Col>
                    </Row>
                </div>

                <div className='comment_field2'>
                    
                    <Row>
                        <Col xs={1} > 
                            <img
                                className='avatar_place'
                                src = {ImgAsset.avatar2}
                            />
                        </Col>
                        <Col > 
                            <p className='comment_username'>Weaver the Demon of Fate</p>
                            <p className='comment_date'>5 months ago</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}></Col>
                        <Col > 
                            <p className='comment_content'>This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!!</p>
                           
                        </Col>
                    </Row>
                </div>

            </div>
         
        </Container>
        <Footer />   
        </div>
    );
}

export default UserStoryPage;