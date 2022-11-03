import React from 'react';
import '../css/storypage.css'
import ImgAsset from '../resources';
import ReactTimeAgo from 'react-time-ago'

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import Pagination from "../components/Pagination";

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Badge, Form, FloatingLabel } from 'react-bootstrap';
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function StoryPage(props) {
    const location = useLocation();
    const { story_id } = location.state;
    console.log(story_id);

    const [userId, setUserId] = useState(() => {
		const localData = sessionStorage.getItem("id");
		return localData ? localData : null;
	});
    const [user, setUser] = useState([]);

    const [story, setStory] = useState([]);
    const [author, setAuthor] = useState([]);
    const [chapters, setChapter] = useState([]);
    const [listChapters, setListChapters] = useState([]);

    // Pagination Settings
    const [allSessionsCount, setallSessionsCount] = useState(1);
    const [sessionsPerPage, setSessionsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    console.log("Current Page : ", currentPage)

    const lastSessionNumber = currentPage * sessionsPerPage;
    const firstSessionIndex = lastSessionNumber - sessionsPerPage;
    const [lastChapter, setLastChapter] = useState([]);

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/${story_id}`)
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

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/api/chapter`)
          .then((response) => {
            console.log(response.data);
            const chapterAsc = [...response.data].sort((a, b) => a.number - b.number);
            setChapter(chapterAsc);
            setListChapters(chapterAsc);  
            console.log("Total Data: ", response.data.length);
            setallSessionsCount(response.data.length); 
            setLastChapter(response.data[(response.data.length) - 1]);           
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);

    // Get Profile User
    useEffect(() => {	
		if (userId !== null){	
			axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/${userId}`)
			.then((response)=> {
				console.log(response);
				setUser(response.data.data);	
			})
		}		
	}, [])

    // Sort Settings
    const [sortFlag, setSortFlag] = useState(true);

    function sortChange (){
        setSortFlag(!sortFlag);

        if(sortFlag !== true){
            const chapterAsc = [...chapters].sort((a, b) => a.number - b.number);
            setChapter(chapterAsc);
        }
        else{
            const chapterDesc = [...chapters].sort((a, b) => b.number - a.number);
            setChapter(chapterDesc); 
        }
    }

    return (
        <div>
        <Navbars/>
        <Container className="mt-3">
            {/* Details Section */}
            <Row className='info_section' >
                {/* Story Cover */}
                <Col md='auto'>
                    {
                        story.link !== null ?(
                            <>
                            <img
                                height="450px"
                                className="cover_img card-img-top"
                                src={story.link}
                                alt="Cover"
                            />
                            </>
                        ):(
                            <>
                            <img
                                height="450px"
                                className="cover_img card-img-top"
                                src={ImgAsset.image_placeholder}
                                alt="Cover"
                            />
                            </>
                        )
                    }     
                </Col>

                <Col xs={5}>
                    <h2 className='story_title2'>{story.title}</h2>
                    <h4 className='section_title'><i>Author :</i> <a href="/author" className='author_text'>{author.username}</a></h4>

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
                        {/* <Link to="/browse"><Badge bg="#B8D9A0" className='genre_badge' >Comedy</Badge>{' '}</Link> */}
                    </div>

                    {/* Button */}
                    <Button className='btn_sp'>Read First Chapter</Button>
                    <Button className='btn_sp'>Add to Bookmark</Button>
                    <Button className='btn_report btn_sp'>Report</Button>

                </Col>

                {/* Like */}
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
            
            {/* Description Section */}
           <div className='info_section'> 
                <h1 className='section_title3'>Description</h1>
                
                <div className='content_field2'>
                    <span className='desc_content'>{story.description}</span>
                </div>
           </div>
            
            {/* Chapters Section */}
            {
                story.type === "Novel" ? (
                    <>
                    <div className='info_section'> 
                        <h1 className='section_title3'>Chapters</h1>
                        <div className='release_content'>Latest Release : 
                            <a className='latest_chapter'>{" "} Chapter {lastChapter.number} : {lastChapter.title} </a>
                                <img
                                    className="icon_sort"
                                    src = {ImgAsset.icon_sort}
                                    onClick ={sortChange}
                                />
                        </div>

                        <div>
                            <Row xs={1} md={2} className="g-4">

                            {chapters
                                .slice(firstSessionIndex,lastSessionNumber)
                                .map((chapter, index) => {
                                const date = chapter.updated_at					
                                const dt = new Date(date)

                                return (
                                    <Link className="link_chapter" 
                                    to={`/story/${story.title}/chapter/${chapter.number}`}
                                    state={{chapter_content: chapter, list_chapter: listChapters}}>
                                        <Col>
                                        <Card className='chapter_card'>
                                            <Card.Body className='chapter_card_body'>
                                            <Card.Title>
                                                <Row>
                                                    <Col xs={2} className='number_chapter'> {chapter.number}
                                                    </Col>
                                                    <Col className='title_chapter'> {chapter.title}
                                                    </Col>
                                                </Row>
                                            </Card.Title>
                                            <Card.Text>
                                                <Row>
                                                    <Col xs={2}> 
                                                    </Col>
                                                    <Col className='date_chapter'><ReactTimeAgo date={dt} locale="en-US"/>
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        </Col>
                                    </Link>
                                )
                                
                            })}
                            
                            
                            </Row>
                        </div>

                        <div className='pagination'>
                            <Pagination
                                itemsCount={allSessionsCount}
                                itemsPerPage={sessionsPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                alwaysShown={false}
                                flagScroll = "2"
                            />
                        </div>
                    </div>
                </>
                ):(<></>)
            }

           

           {/* Comments Section */}
            <div className='info_section'> 
                <h1 className='section_title3'>Comments</h1>
                <div className='comment_field'>
                    
                    <Row>
                        <Col xs={1} >
                        {
                            userId !== null ?(
                                <>
                                {
                                    user.avatar !== null ?(
                                        <>
                                        <img
                                        src = {user.avatar}
                                        className="avatar_place"
                                        style={{width: 50, height: 50, borderRadius: 50/ 2}}
                                        />
                                        </>
                                    ):(
                                        <>
                                        <img
                                        src = {ImgAsset.avatar2}
                                        className="avatar_place"
                                        alt="avatar"
                                        />
                                        </>
                                    )
                                }
                                </>
                            ):(
                                <>
                                <img
                                src = {ImgAsset.avatar2}
                                className="avatar_place"
                                alt="avatar"
                                />
                                </>
                            )
                        }
                        
                        </Col>
                        <Col > 
                            <div className='comment_form'>
                                {
                                    userId === null ?(
                                        <>
                                        {/* Not Logged In */}
                                        <div className='notlogin_box'>
                                            <Col><p className='login_note'>You Must Be Logged In to Comment</p></Col>
                                            <Col><Button href='/login' className='btn_comment_form'>Login</Button></Col>
                                        </div>
                                        </>
                                    ):(
                                                             
                                        <>
                                        {/* Logged In */}
                                        <div className='login_box'>
                                            <FloatingLabel
                                                controlId="floatingTextarea"
                                                label="Comment"
                                                className="mb-3"
                                            >
                                                <Form.Control as="textarea" placeholder="Leave a comment here" />
                                            </FloatingLabel>
                                            <Button className='btn_comment_form'>Post Comment</Button>
                                        </div>
                                        </>                    
                                    )
                                }
      
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
                            <div className='comment_content_box'>
                                <p className='comment_content'>This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!!</p>
                            </div>  
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
                            <div className='comment_content_box'>
                                <p className='comment_content'>This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!!</p>
                            </div>
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
                            <div className='comment_content_box'>
                                <p className='comment_content'>This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!! This story is really Awesome !!!</p>
                            </div>
                        </Col>
                    </Row>
                </div>

            </div>
         
        </Container>
        <Footer/>
        </div>
    );
}

export default StoryPage;