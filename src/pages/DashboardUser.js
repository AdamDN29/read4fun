import React from 'react';
import ImgAsset from '../resources';
import '../css/DashboardUser.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import ReactTimeAgo from 'react-time-ago'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, CloseButton } from 'react-bootstrap'
import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import StoryCard from '../components/StoryCard';
import Swal from "sweetalert2"

function DashboardUser() {

    const [userId, setUserId] = useState(() => {
		const localData = sessionStorage.getItem("id");
		return localData ? localData : null;
	});

    const [profile, setProfile] = useState([]);
    const [storys, setStory] = useState([]);
    const [bookmarks, setBookmark] = useState([]);

    const [flag, setFlag] = useState(false);

    useEffect(() => {
        // Get Data Profile User
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/${userId}`)
          .then((response) => {
            setProfile(response.data.data);       
            console.log(response.data.data);

        // Get Data Story User
            axios
            // .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/user/${userId}`)
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/sort`)
            .then((response) => {
                setStory(response.data);
                setFlag(true);
                console.log(response.data);
            })

        // Get Data Bookmark User
            axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/sort`)
            .then((response) => {
                let sortedBookmark = response.data.sort((a, b) => new Date(...b.updated_at.split('/').reverse()) - new Date(...a.updated_at.split('/').reverse()));
                setBookmark(sortedBookmark);           
                console.log(response.data);
            })
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);

    // Delete Bookmark
    function deleteBookmark () {
        Swal.fire({
            icon: 'question',
            title: 'Are you sure you want to delete this bookmark ?',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: '#D3455B',
            confirmButtonText: 'Delete',
            showCancelButton: true,
            preConfirm: () => {
                window.location.href = "/dashboard";
            }	  
        }) 	
    }

    return (
        <div>
        <Navbars />   
        <Container className="mt-3">

            {/* Details User */}
            <Row className="Border">

                <Col md={"auto"} className='detailAvatar'>
                    {
                        profile.avatar !== null ?(
                            <img src = {profile.avatar} style={{width: 225, height: 225, borderRadius: 225/ 2}}/>
                        ):(
                            <img src = {ImgAsset.avatar}/>
                        )
                    } 
                </Col>

                <Col> 
                    <Row>
                        <Col>
                            <h2 className='username_user'>{profile.username}</h2>
                        </Col>
                        <Col>
                            <Button href='/editprofile' className='btn_editprofile'>Edit Profile</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row>
                                <div className="detail_list3">
                                    <img
                                        width="25px"
                                        height="25px"
                                        className="detail_list_icon3"
                                        src = {ImgAsset.icon_email}
                                    />
                                    <span className="icon_text3">{profile.email}</span>
                                </div>
                            </Row>
                            <Row>
                                <div className="detail_list3">
                                    <img
                                        width="25px"
                                        height="25px"
                                        className="detail_list_icon3"
                                        src = {ImgAsset.icon_fullname}
                                    />
                                    <span className="icon_text3">
                                        {profile.name !== null ?(<>{profile.name}</>):(<i style={{opacity:0.5}}>Name not set yet</i>)}        
                                    </span>
                                </div>
                            </Row>
                            <Row>
                                <div className="detail_list3">
                                    <img
                                        width="25px"
                                        height="25px"
                                        className="detail_list_icon3"
                                        src = {ImgAsset.icon_birthdate}
                                    />
                                    <span className="icon_text3">
                                        {profile.birthdate !== null ?(<>{profile.birthdate}</>):(<i style={{opacity:0.5}}>Birthdate not set yet</i>)}        
                                    </span>
                                </div>
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                <div className="detail_list3">
                                    <img
                                        width="25px"
                                        height="25px"
                                        className="detail_list_icon3"
                                        src = {ImgAsset.icon_occupation}
                                    />
                                    <span className="icon_text3">
                                        {profile.occupation !== null ?(<>{profile.occupation}</>):(<i style={{opacity:0.5}}>Occupation not set yet</i>)}    
                                    </span>
                                </div>
                            </Row>
                            <Row>
                                <div className="detail_list3">
                                    <img
                                        width="25px"
                                        height="25px"
                                        className="detail_list_icon3"
                                        src = {ImgAsset.icon_address}
                                    />
                                    <span className="icon_text3">
                                        {profile.address !== null ?(<>{profile.address}</>):(<i style={{opacity:0.5}}>Address not set yet</i>)}        
                                    </span>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Col> 
            </Row>

            {/* Bookmark & Story User */}
            <Row>
                {/* Bookmark User */}
                <Col md="4">
                    <Row className='bookmark_box'>
                        <Col >
                            <Row ><h2 className='bookmark_title'>Bookmarks</h2></Row>
                            <>
                            {bookmarks.slice(0,4).map((bookmark) => {
                                const date = bookmark.updated_at					
                                const dt = new Date(date)
                                return(
                                   <Row className='bookmark_story'> 
                                        <Col className='col_bookmark'>
                                            <Link
                                            to={`/story/${bookmark.title}`}
                                            state={{story_id: bookmark.id}}>
                                            <Row>
                                                <p className='bookmark_story_title'>{bookmark.title}</p>
                                                <p className='bookmark_story_date'><i><ReactTimeAgo date={dt} locale="en-US"/></i></p>
                                            </Row>
                                            </Link>
                                        </Col> 
                                        <Col md={2}>
                                            <Button onClick={deleteBookmark} className='btn_del_bookmark'>
                                                <img  width="20px"  height="20px" className="icon_del" src = {ImgAsset.icon_delete}/>
                                            </Button>
                                        </Col>
                                    </Row>   
                            )})}
                            </>
                        </Col>
                    </Row>
                </Col>
                {/* Story User */}
                <Col>
                    <div className='userstory_box'>
                        <Row className='title_box'>
                            <Col><h2 className='userstory_title'>Your Story</h2></Col>     
                            <Col>
                                <Link className="link_chapter" 
                                to={`/editdetail/newStory`}
                                >
                                    <Button className='btn_addstory'>
                                    <img
                                        width="15px"
                                        height="15px"
                                        className="detail_list_icon5"
                                        src = {ImgAsset.icon_add}
                                    /> Add Story
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                        
                        <div className="border_bottom detail_list3">
                            <img
                                width="25px"
                                height="25px"
                                className="detail_list_icon3"
                                src = {ImgAsset.book_updates}
                            />
                            <span className="icon_text3">{storys.length} Story</span>
                        </div>
                        {/* User Story List */}
                        <div className='list_Story_box'>
                            
                            {     
                                flag === false ?(
                                    <>
                                    <p>No User Stories</p>
                                    </>
                                ):(
                                    <>
                                    {
                                        storys.map((story)=>{
                                            const date = story.updated_at					
                                            const dt = new Date(date)
                                            return(
                                                <>
                                                {/* Story Box */}
                                                <Link key={story.id} className="link_chapter" 
                                                    to={`/userstory/${story.title}`}
                                                    state={{story_id: story.id}}
                                                >
                                                <Row className='story_box'>
                                                    <Col md="auto">
                                                        {
                                                            story.link !== null ?(
                                                                <img width="225px" height="300px" className='cover_image_dashboard' src = {story.link}/>
                                                            ):(
                                                                <img width="225px" height="300px" className='cover_image_dashboard' src = {ImgAsset.image_placeholder}/>
                                                            )
                                                        }
                                                        
                                                    </Col>
                                                    <Col>
                                                        <Row>
                                                            <h2 className='list_story_title'>{story.title}</h2>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Row>
                                                                    <div className="detail_list3">
                                                                        <img
                                                                            width="20px"
                                                                            height="20px"
                                                                            className="detail_list_icon3"
                                                                            src = {ImgAsset.icon_type2}
                                                                        />
                                                                        <span className="size_s icon_text3">{story.type}</span>
                                                                    </div>
                                                                </Row>
                                                                <Row>
                                                                    <div className="detail_list3">
                                                                        <img
                                                                            width="20px"
                                                                            height="20px"
                                                                            className="detail_list_icon3"
                                                                            src = {ImgAsset.icon_status2}
                                                                        />
                                                                        <span className="size_s icon_text3">{story.status}</span>
                                                                    </div>
                                                                </Row>
                                                                <Row>
                                                                    <div className="detail_list3">
                                                                        <img
                                                                            width="20px"
                                                                            height="20px"
                                                                            className="detail_list_icon3"
                                                                            src = {ImgAsset.icon_chapter2}
                                                                        />
                                                                        <span className="size_s icon_text3">
                                                                            { story.chapter !== null ? (
                                                                                <>{story.chapter}</>
                                                                                ):(<>0</>)
                                                                            }  Chapters  
                                                                        </span>
                                                                    </div>
                                                                </Row>
                                                                <Row>
                                                                    <div className="detail_list3">
                                                                        <img
                                                                            width="20px"
                                                                            height="20px"
                                                                            className="detail_list_icon3"
                                                                            src = {ImgAsset.icon_update2}
                                                                        />
                                                                        <span className="size_s icon_text3"><i><ReactTimeAgo date={dt} locale="en-US"/></i></span>
                                                                    </div>
                                                                </Row>
                                                            </Col>
                                                            <Col>
                                                                <Row>
                                                                    <div className="detail_list3">
                                                                        <img
                                                                            width="20px"
                                                                            height="20px"
                                                                            className="detail_list_icon3"
                                                                            src = {ImgAsset.icon_view2}
                                                                        />
                                                                        <span className="size_s icon_text3"> 
                                                                            { story.view !== null ? (
                                                                                <>{story.view}</>
                                                                                ):(<>1</>)
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </Row>
                                                                <Row>
                                                                    <div className="detail_list3">
                                                                        <img
                                                                            width="20px"
                                                                            height="20px"
                                                                            className="detail_list_icon3"
                                                                            src = {ImgAsset.icon_like2}
                                                                        />
                                                                        <span className="size_s icon_text3">
                                                                            { story.like !== null ? (
                                                                                <>{story.like}</>
                                                                                ):(<>1</>)
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </Row>
                                                                <Row>
                                                                    <div className="detail_list3">
                                                                        <img
                                                                            width="20px"
                                                                            height="20px"
                                                                            className="detail_list_icon3"
                                                                            src = {ImgAsset.icon_bookmark2}
                                                                        />
                                                                        <span className="size_s icon_text3">
                                                                            { story.bookmark !== null ? (
                                                                                <>{story.bookmark}</>
                                                                                ):(<>1</>)
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                </Link>           
                                                </>
        
                                            )
                                        })

                                    }
                                    </>
                                )
                             
                            }
               
                        </div>
                    </div>
                    
                </Col>

            </Row>
                   
            
        </Container>
        <Footer />   
        </div>
    );
}

export default DashboardUser;