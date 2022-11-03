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


function DashboardUser() {

    const [userId, setUserId] = useState(() => {
		const localData = sessionStorage.getItem("id");
		return localData ? localData : null;
	});

    const [profile, setProfile] = useState([]);
    const [storys, setStory] = useState([]);

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
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    return (
        <div>
        <Navbars />   
        <Container className="mt-3">

            {/* Details User */}
            <Row className="Border">

                <Col md={"auto"} className='detailAvatar'>
                    {
                        profile.avatar !== null ?(
                            <>
                            <img
                            src = {profile.avatar}
                            style={{width: 225, height: 225, borderRadius: 225/ 2}}
                            />
                            </>
                        ):(
                            <>
                            <img
                            height="225px"
                            src = {ImgAsset.avatar}
                            />
                            </>
                        )
                    } 
                </Col>

                {/* <Col>
                    <Row className='title_area'>
                        <h2 className='username_user'>STMJ_MuWantap</h2>
                        <Button className='btn_editprofile'>Edit Profile</Button>
                    </Row>
                
                </Col> */}

                <Col> 
                    <Row>
                        <Col>
                            <h2 className='username_user'>{profile.username}</h2>
                        </Col>
                        <Col>
                            <Button className='btn_editprofile'>Edit Profile</Button>
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
                    <div className='bookmark_box'>
                        <h2 className='bookmark_title'>Bookmarks</h2>
                        <div className='bookmark_story'>
                            <p className='bookmark_story_title'>Shadow Slave</p>
                            <p className='bookmark_story_date'>2 days ago</p>
                        </div>
                        <div className='bookmark_story'>
                            <p className='bookmark_story_title'>The Beginning After The End</p>
                            <p className='bookmark_story_date'>3 days ago</p>
                        </div>
                        <div className='bookmark_story'>
                            <p className='bookmark_story_title'>Normal People</p>
                            <p className='bookmark_story_date'>1 week ago</p>
                        </div>
                    </div>
                </Col>
                {/* Story User */}
                <Col>
                    <div className='userstory_box'>
                        <Row className='title_box'>
                            <Col><h2 className='userstory_title'>Your Story</h2></Col>     
                            <Col><Button className='btn_addstory'>
                                <img
                                    width="15px"
                                    height="15px"
                                    className="detail_list_icon5"
                                    src = {ImgAsset.icon_add}
                                /> Add Story
                                </Button>
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
                                                                        <span className="size_s icon_text3">{story.chapter} Chapters</span>
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