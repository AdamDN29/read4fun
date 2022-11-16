import React from 'react';
import '../css/storypage.css'
import 'animate.css';
import ImgAsset from '../resources';
import ReactTimeAgo from 'react-time-ago'

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import Pagination from "../components/Pagination";
import GetLike from '../hook/GetLike';
import GetBookmark from '../hook/GetBookmark';
import CommentSection from '../components/CommentSection';

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Badge, Form, FloatingLabel } from 'react-bootstrap';
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2"
import axios from "axios";

function StoryPage() {
    // const location = useLocation();
    // const { story_id } = location.state;
    const { story_id } = useParams();
    console.log(story_id);

    const [userId, setUserId] = useState(() => {
		const localData = sessionStorage.getItem("id");
		return localData ? localData : null;
	});

    const [user, setUser] = useState([]);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [numberLike, setNumberLike] = useState();
    const [numberBookmark, setNumberBookmark] = useState();

    const [story, setStory] = useState([]);
    const [author, setAuthor] = useState([]);
    const [chapters, setChapter] = useState([]);
    const [genres, setGenre] = useState([]);
    const [listChapters, setListChapters] = useState([]);
    const [firstChapter, setFirstChapter] = useState([]);
    const [lastChapter, setLastChapter] = useState([]);
    const [flag, setFlag] = useState(false);

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
            getNumberLike();
            getNumberBookmark();

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
            setListChapters(chapterAsc);  
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

    // Get Genre Story
    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getGenre/${story_id}`)
          .then((response) => {
            console.log(response.data);
            const sortedGenre = [...response.data].sort((a, b) => a.id - b.id);
            setGenre(sortedGenre);      
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);

    // Get User Like Story
    useEffect(() => {
        if (userId !== null){
            axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/userLike/${userId}`)
            .then((response) => {
                response.data.map((like) => {
                    if (like.story_id === Number(story_id)){
                        setLiked(true);   
                    }
                })
                
            })
            .catch((err) => {
                console.log(err);
            });
        }    
    }, []);

    // Get User Bookmark Story
    useEffect(() => {
        if (userId !== null){
            axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/userBookmark/${userId}`)
            .then((response) => {
                response.data.map((bookmark) => {
                    if (bookmark.story_id === Number(story_id)){
                        setBookmarked(true);   
                    }
                })
                
            })
            .catch((err) => {
                console.log(err);
            });
        }   
    }, []);

    function getNumberLike (){
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getLike/${story_id}`)
          .then((response) => {
            console.log("Like : ", response);
            setNumberLike(response.data)
        })
        .catch((err) => {
            console.log(err);
        });   
    }

    function getNumberBookmark (){
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getBookmark/${story_id}`)
          .then((response) => {
            console.log("Bookmark : ", response);
            setNumberBookmark(response.data.length)
        })
        .catch((err) => {
            console.log(err);
        });
        
    }

    // Sort Settings
    const [sortFlag, setSortFlag] = useState(true);

    // Change Sort of Chapter Story
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

    // Pop Up Not Logged In
    function notLoginPop (){
        Swal.fire({
            title: 'Oopss.. !',
            text: 'Please Login First',
            icon: 'warning',
            confirmButtonColor: '#B8D9A0'
        })
    }

    // Report Function
    const reportStory = async () => {
        if (userId !== null){
            const { value: report_content } = await Swal.fire({
                title: 'Report Story',
                input: 'textarea',
                inputLabel: 'Your Report',
                inputPlaceholder: 'Enter Your Report',
                confirmButtonColor: '#D3455B',
                confirmButtonText: 'Send Report',
                showCancelButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
              })
              
              if (report_content) {

                const formData = new FormData();

                formData.append('story_id', story.id);
                formData.append('explanation', report_content);

                await axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/story/report`, 
                    formData, {
                        headers: {
                            Authorization : `Bearer ${sessionStorage.getItem("token")}`
                        }
                })
                .then((response) => {
                    console.log(response);
        
                    Swal.fire({
                        title: 'Sent !',
                        text: 'Your report has been sent',
                        // text: `Your Report : ${report_content}`,
                        icon: 'success',
                        confirmButtonColor: '#B8D9A0'
                    })
                })
                .catch((error) => {
                    console.log("ERROR: ", error);
                    Swal.fire({
                        title: 'Error !',
                        text: `Your report failed to send because ${error.response.data.error}`,
                        icon: 'error',
                        confirmButtonColor: '#B8D9A0'
                    })
                })

                
              }
        } else{
            notLoginPop();
        }
    }

    // Change Like
    function changeLike (){
        if(userId === null){
            notLoginPop();
        }
        else{
            console.log("Change Like")
            if(liked === true){
                Swal.fire({
                    icon: 'question',
                    title: 'Unlike this Story ?',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#D3455B',
                    showCancelButton: true,
                    preConfirm: () => {
                        axios
                        .create({
                            headers: {
                            Authorization : `Bearer ${sessionStorage.getItem("token")}`
                            }
                        })
                        .post(`${process.env.REACT_APP_BACKEND_URL}/api/story/unlike/${story_id}`)
                        .then((response) => {
                            console.log(response.data);
                            setLiked(false);
                            
                            Swal.fire({
                                icon: 'success',
                                title: 'You Unliked This Story',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonColor: '#B8D9A0',
                                preConfirm: () =>{
                                    getNumberLike();
                                }
                            }) 	
                    
                        })
                        .catch((err) => {
                            console.log(err);
                            Swal.fire({
                                icon: 'error',
                                title: 'Failed to Unlike This Story',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonColor: '#D3455B',
                            }) 
                        });
                    }	  
                }) 		
                
            }else{
                axios
                .create({
                    headers: {
                      Authorization : `Bearer ${sessionStorage.getItem("token")}`
                      }
                })
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/story/like/${story_id}`)
                .then((response) => {
                    console.log(response.data);
                    setLiked(true);
                    Swal.fire({
                        icon: 'success',
                        title: 'You Liked This Story',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonColor: '#B8D9A0',
                        preConfirm: () =>{
                            getNumberLike();
                        }
                    }) 	
            
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to Like This Story',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonColor: '#D3455B',
                    }) 
                });
            }
        }   
    }

    // Change Bookmark
    function changeBookmark () {
        if(userId === null){
            notLoginPop();
        }
        else{
            console.log("Change Bookmark")
        
            if(bookmarked === true){
                Swal.fire({
                    icon: 'question',
                    title: 'Delete Story from bookmark ?',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#D3455B',
                    showCancelButton: true,
                    preConfirm: () => {   
                        axios
                        .create({
                            headers: {
                            Authorization : `Bearer ${sessionStorage.getItem("token")}`
                            }
                        })
                        .post(`${process.env.REACT_APP_BACKEND_URL}/api/story/unbookmark/${story_id}`)
                        .then((response) => {
                            console.log(response.data);
                            setBookmarked(false);
                            
                            Swal.fire({
                                icon: 'success',
                                title: 'You remove this Story from Bookmark',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonColor: '#B8D9A0',
                                preConfirm: () =>{
                                    getNumberBookmark();
                                }
                            }) 	
                    
                        })
                        .catch((err) => {
                            console.log(err);
                            Swal.fire({
                                icon: 'error',
                                title: 'Failed to remove this Story from Bookmark',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonColor: '#D3455B',
                            }) 
                        });
                    }	  
                }) 		 
            }else{
                axios
                .create({
                    headers: {
                    Authorization : `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/story/bookmark/${story_id}`)
                .then((response) => {
                    console.log(response.data);
                    setBookmarked(true);
                    Swal.fire({
                        title: 'Bookmarked',
                        text: 'This Story has been added to your bookmarks',
                        icon: 'success',
                        confirmButtonColor: '#B8D9A0',
                        preConfirm: () =>{
                            getNumberBookmark();
                        }
                    })
            
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to Bookmark This Story',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonColor: '#D3455B',
                    }) 
                });
            
            }
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
                            <img width="300px" height="450px" className="cover_img" src={story.link} alt="Cover"/>
                        ):(
                            <img width="300px" height="450px" className="cover_img" src={ImgAsset.image_placeholder} alt="Cover"/>
                        )
                    }     
                </Col>
                
                <Col xs={5}>
                    <h2 className='story_title2'>{story.title}</h2>
                    <h4 className='section_title'><i>Author : </i> 
                        <Link 
                        to="/author"  
                        state={{author_id: author.id}}
                        className='author_text'>{author.username}</Link>
                    </h4>

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
                                    {numberLike}
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
                                    {numberBookmark}
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
                    </div>

                    {/* Button */}
                    
                        <Button className='btn_sp' disabled={!flag}>
                            <Link  className='white_p'
                                to={`/story/${story.id}/chapter/${firstChapter.number}`}
                                // state={{chapter_content: firstChapter, list_chapter: listChapters}}
                            >
                            { story.type === "Novel" ?(<>Read First Chapter</>):(<>Read Story</>)}
                            </Link>
                        </Button>
                    
                    
                    <Button onClick={changeBookmark} className='btn_sp'>
                        {bookmarked ? ("Bookmarked"):("Add to Bookmark")}                        
                    </Button>
                    <Button onClick={reportStory} className='btn_report btn_sp'>Report</Button>

                </Col>

                {/* Like */}
                <Col >
                    <div className='like_section'>
                        <p className='like_question'>Like This Story ?</p>
                        <div className={liked ? ("like_icon_place_active"):("like_icon_place")}
                            onClick={changeLike}
                        >
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
                        {
                            flag === false ?(
                                <p>There are no chapters in this novel yet</p>
                            ):(
                                <>
                                <div className='release_content'>Latest Release : 
                                    <Link className="link_chapter" 
                                    to={`/story/${story.id}/chapter/${lastChapter.number}`}
                                    // state={{chapter_content: lastChapter, list_chapter: listChapters}}
                                    ><a className='latest_chapter'>{" "} Chapter {lastChapter.number} : {lastChapter.title} </a>
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
                                        .map((chapter, index) => {
                                        const date = chapter.updated_at					
                                        const dt = new Date(date)

                                        return (
                                            <Link className="link_chapter" 
                                            key={chapter.id}
                                            to={`/story/${story.id}/chapter/${chapter.number}`}
                                            // state={{chapter_content: chapter, list_chapter: listChapters}}
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
                                
                                </>
                            )
                        }      
                    </div>
                </>
                ):(<></>)
            }

           

           {/* Comments Section */}
           <CommentSection key={story.id} userId={userId} story_id={story_id} author_Id={story.user_id}/>
         
        </Container>
        <Footer/>
        </div>
    );
}

export default StoryPage;