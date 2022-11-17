import React from 'react';
import '../css/storypage.css'
import ImgAsset from '../resources';

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import Pagination from "../components/Pagination";
import GetLike from '../hook/GetLike';
import GetBookmark from '../hook/GetBookmark';
import CommentSection from '../components/CommentSection';

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Badge, Form, FloatingLabel } from 'react-bootstrap';
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useNavigate } from "react";
import axios from "axios";
import ReactTimeAgo from 'react-time-ago'
import Swal from "sweetalert2"

function UserStoryPage() {
    // const location = useLocation();
    // const { story_id } = location.state;
    const { story_id } = useParams();
    console.log(story_id);

    const [userId, setUserId] = useState(() => {
		const localData = sessionStorage.getItem("id");
		return localData ? localData : null;
	});

    const [story, setStory] = useState([]);
    const [author, setAuthor] = useState([]);
    const [chapters, setChapter] = useState([]);
    const [genres, setGenre] = useState([]);
    const [firstChapter, setFirstChapter] = useState([]);
    const [lastChapter, setLastChapter] = useState([]);
    const [flag, setFlag] = useState(false);

    const [newChapter, setNewChapter] = useState();
    const [listGenre, setListGenre] = useState();
    const [idGenre, setIdGenre] = useState();

    // Pagination Settings
    const [allSessionsCount, setallSessionsCount] = useState(1);
    const [sessionsPerPage, setSessionsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    console.log("Current Page : ", currentPage)

    const lastSessionNumber = currentPage * sessionsPerPage;
    const firstSessionIndex = lastSessionNumber - sessionsPerPage;
    

    // Get Data Story 
    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/${story_id}`)
          .then((response) => {
            setStory(response.data[0]);
            console.log(response.data);

            if(response.data[0].banned === 1){
                Swal.fire({
                    icon: "warning",
                    title: "Your Story Is Banned!",
                    text: "Reason: " + response.data[0].explaination,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: "#B8D9A0",
                    preConfirm: () => {
                        window.location.href = "/dashboard";
                    },
                    footer:
                      '<center><p>Please contact <a href="mailto:read4fun.developer@gmail.com"> read4fun.developer@gmail.com </a> <br>if you think this is a mistake </p></center>',
                  });
            }
            // Get Data Author
            axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/${response.data[0].user_id}`)
            .then((response) => {
                setAuthor(response.data.data);
                console.log(response.data.data);
            })
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    // Get Story Chapter 
    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/api/chapter/story/${story_id}`)
          .then((response) => {
            console.log(response.data);
            const chapterAsc = [...response.data].sort((a, b) => a.number - b.number);
            setChapter(chapterAsc);
            console.log("Total Data: ", response.data.length);
            setallSessionsCount(response.data.length); 
            setFirstChapter(response.data[0]);
            setLastChapter(response.data[(response.data.length) - 1]); 
            setFlag(true);     
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);

    // Get Genre Story
    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getGenre/${story_id}`)
          .then((response) => {
            console.log(response.data);
            const sortedBookmark = [...response.data].sort((a, b) => a.id - b.id);
            setGenre(sortedBookmark); 
            const temp1 = [];
            const temp2 = [];
            response.data.map((genre, index) => {
                temp1.push(genre.genre_id);
                temp2.push(genre.id);
                console.log("Temp ",index," : ", temp1)
            })   
            setListGenre(temp1);
            setIdGenre(temp2);
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);

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

    // Delete Story
    function deleteStory () {
        Swal.fire({
            icon: 'question',
            title: 'Are you sure you want to delete this story ?',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: '#D3455B',
            confirmButtonText: 'Delete',
            showCancelButton: true,
            preConfirm: () => {
                axios
                .delete(`${process.env.REACT_APP_BACKEND_URL}/api/story/delete/${story.id}`)
                .then((response) => {
                    console.log(response)

                    Swal.fire({
                        icon: 'success',
                        title: 'Delete Story Succesfull',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonColor: '#B8D9A0',
                        preConfirm: () => {
                            window.location.href='/dashboard'
                        }	  
                    }) 		
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Delete Story Failed',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonColor: '#D3455B',
                    }) 
                    return;
                });
            }	  
        }) 	
    }

    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            {/* Details Section */}
            <Row className='info_section' >
                {/* Story Cover */}
                <Col md='auto'>
                    {
                        story.link !== null ?( 
                            <img width="300px" height="450px" className="cover_img" src={story.link} alt="Cover"/>
                        ):(
                            <img width="300px" height="450px" className="cover_img" src={ImgAsset.image_placeholder} alt="Cover"/>
                        )
                    }
                </Col>
                
                {/* Detail Story */}
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
                                <span className="icon_text">
                                    { story.chapter !== null ? (
                                        <>{story.chapter}</>
                                        ):(<>0</>)
                                    }  Chapters  
                                </span>
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
                                    <GetLike key={story.id} story_id={story.id} /> 
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
                                    <GetBookmark key={story.id} story_id={story.id} />
                                </span>
                            </div>
                        </Col>
                    </Row>

                    {/* Genre */}
                    <div className='row_detail'>
                        <h4 className='section_title2'><i>Genre</i></h4>
                        {
                            genres.length === 0 ? (
                                <p className='p_note'><i>Genre not set</i></p>
                            ):(
                                <>
                                {
                                    genres.map((genre) => {
                                        return (
                                        <Link to={"/browse/" + genre.genre_name}
                                            // state={{link_query: genre.genre_id}}
                                        >
                                            <Badge bg="#B8D9A0" className='genre_badge' >{genre.genre_name}</Badge>{' '}
                                        </Link>)
                                    })
                                }
                                </>
                            )
                        }
                        {/* <Link to="/browsepage"><Badge bg="#B8D9A0" className='genre_badge' >Comedy</Badge>{' '}</Link> */}
                    </div>

                    {/* Button */}
                        <Link 
                            to={`/editdetail/${story.title}`}
                            state={{story_id: story.id, list_genre: listGenre, id_genre: idGenre}}    
                            ><Button className='btn_sp'>Edit Detail</Button></Link>
                    {
                        story.type === "Novel" ?(
                            <>
                            <Link 
                            to={`/userstory/${story.id}/writing/newChapter`}
                            // state={{chapter_content: newChapter}}    
                            >
                            <Button className='btn_sp'>Add New Chapter</Button>
                            </Link>
                            </>
                        ):(
                            <>
                                {chapters.length !== 0 ? (
                                    <Link className="link_chapter" 
                                        to={`/userstory/${story.title}/writing/${firstChapter.number}`}
                                        state={{chapter_content: firstChapter}}
                                    >
                                        <Button className='btn_sp'>Edit Story</Button>
                                    </Link>
                                ):(
                                    <Link className="link_chapter" 
                                        to={`/userstory/${story.title}/writing/newChapter`}
                                        state={{chapter_content: newChapter}}
                                    >
                                        <Button className='btn_sp'>Add Story</Button>
                                    </Link>
                                )
                                }
                            </>
                        )
                    }
                    <Button onClick={deleteStory} className='btn_report btn_sp'>Delete Story</Button>
                </Col>

                {/* Like */}
                <Col >
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
                        {
                            flag === false ?(
                                <>
                                    <p>There are no chapters in this novel yet</p>
                                    <p className='latest_chapter'>
                                        <Link className='latest_chapter'
                                        to={`/userstory/${story.title}/writing/newChapter`}
                                        state={{chapter_content: newChapter}}    
                                        > Add a new chapter </Link>
                                    </p> 
                                </>
                            ):(
                                <>
                                <p> <i>You can edit and delete your story chapter by click the story chapter you want</i></p>
                                <div className='release_content'>Latest Release : 
                                    <Link 
                                        to={`/userstory/${story.id}/writing/${lastChapter.number}`}
                                        // state={{chapter_content: lastChapter}}    
                                    >
                                            <a className='latest_chapter'>{" "} Chapter {lastChapter.number} : {lastChapter.title} </a>
                                    </Link>
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
                                        .map((chapter) => {
                                                let updated_at = new Date(chapter.updated_at).toString()
                                                // const date = chapter.updated_at					
                                                // const dt = new Date(date)

                                                return (
                                                    <Link key={chapter.id} className="link_chapter" 
                                                    to={`/userstory/${story.id}/writing/${chapter.number}`}
                                                    // state={{chapter_content: chapter}}
                                                    >
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
                                                                    <Col className='date_chapter'>
                                                                        {/* <ReactTimeAgo date={dt} locale="en-US"/> */}
                                                                        {updated_at}
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
                                </>
                            )
                        }
                        

                    </div>
                </>
                ):(<></>)
            }

           {/* Comments Section */}
           <CommentSection key={story_id} userId={userId} story_id={story_id} author_Id={story.user_id}/>
         
        </Container>
        <Footer />   
        </div>
    );
}

export default UserStoryPage;