import React from 'react';
import ImgAsset from '../resources';
import '../css/DashboardUser.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import { useState, useEffect } from "react";
import ReactTimeAgo from 'react-time-ago'
import axios from "axios";
import Swal from "sweetalert2"

//import component Bootstrap React
import { Card, Container, Row, Col , Button, CloseButton } from 'react-bootstrap'
import { Link, useParams, useLocation } from "react-router-dom";

function AuthorPage() {
    const location = useLocation();
    const {author_id } = location.state;
    console.log(author_id);

    const [author, setAuthor] = useState([]);
    const [storys, setStory] = useState([]);

    const [flag, setFlag] = useState(false);

    const [userId, setUserId] = useState(() => {
		const localData = sessionStorage.getItem("id");
		return localData ? localData : null;
	});
    const [userToken, setUserToken] = useState(() => {
		const localData = sessionStorage.getItem("token");
		return localData ? localData : null;
	});

    useEffect(() => {
        // Get Data Profile User
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/${author_id}`)
          .then((response) => {
            setAuthor(response.data.data); 
            console.log(response.data.data);
        
        // Get Data Story User
            axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/story/user/${author_id}`)
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
                title: 'Report Author',
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

                formData.append('reported_user_id', author.id);
                formData.append('explanation', report_content);

                await axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/report`, 
                    formData, {
                        headers: {
                            'Authorization' : `Bearer ${userToken}`
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

    return (
        <div>
        <Navbars />   
        <Container className="mt-3">

            {/* Details User */}
            <Row className="Border">
                <Col md={"auto"} className='detailAvatar'>
                    {
                        author.avatar !== null ?(
                            <>
                            <img
                            src = {author.avatar}
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

                <Col> 
                    <Row>
                        <Col>
                            <h2 className='username_user'>{author.username}</h2>
                        </Col>
                        <Col>
                            <Button onClick={reportStory} className='btn_report_author btn_editprofile'>Report</Button>
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
                                    <span className="icon_text3">{author.email}</span>
                                </div>
                            </Row>
                            {
                                author.name !== null ?(
                                    <Row>
                                        <div className="detail_list3">
                                            <img
                                                width="25px"
                                                height="25px"
                                                className="detail_list_icon3"
                                                src = {ImgAsset.icon_fullname}
                                            />
                                            <span className="icon_text3">{author.name !== null ?(<>{author.name}</>):(<i style={{opacity:0.5}}>Name not set yet</i>)}</span>
                                        </div>
                                    </Row>
                                ):(<></>)
                            }
                            
                            <Row>
                                <div className="detail_list3">
                                    <img
                                        width="25px"
                                        height="25px"
                                        className="detail_list_icon3"
                                        src = {ImgAsset.icon_birthdate}
                                    />
                                    <span className="icon_text3">{author.birthdate !== null ?(<>{author.birthdate}</>):(<i style={{opacity:0.5}}>Birthdate not set yet</i>)}</span>
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
                                    <span className="icon_text3">{author.occupation !== null ?(<>{author.occupation}</>):(<i style={{opacity:0.5}}>Occupation not set yet</i>)}    </span>
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
                                    <span className="icon_text3">{author.address !== null ?(<>{author.address}</>):(<i style={{opacity:0.5}}>Address not set yet</i>)} </span>
                                </div>
                            </Row>
                        </Col>
                    </Row>    
                </Col> 
            </Row>

            {/* Story Author */}
            <Row>
                {/* Story Author */}
                <Col>
                    <div className='userstory_box'>
                        <h2 className='userstory_title'>Author's Story</h2>
                        <div className="border_bottom detail_list3">
                            <img
                                width="25px"
                                height="25px"
                                className="detail_list_icon3"
                                src = {ImgAsset.book_updates}
                            />
                            <span className="icon_text3">{storys.length} Stories</span>
                        </div>
                        {/* Author Story List */}
                        <div className='list_Story_box'>
                            {/* Story Box */}
                            {
                                
                                flag === false ?(
                                    <>
                                    <p>No Author Stories</p>
                                    </>
                                ):(
                                    <Row xs="1" md="2" className="addMargin" style={{marginLeft: "1px"}}>
                                    {
                                        storys.map((story)=>{
                                            const date = story.updated_at					
                                            const dt = new Date(date)
                                            return(
                                                <>
                                                
                                                {/* Story Box */}
                                                <Link key={story.id} className="link_chapter" 
                                                    to={`/story/${story.title}`}
                                                    state={{story_id: story.id}}
                                                >
                                                <Col className="addMargin">
                                                <Row className='story_box'>
                                                    <Col md="auto">
                                                        {
                                                            story.link !== null ?(
                                                                <img width="175px" height="250px" className='cover_image_dashboard' src = {story.link}/>
                                                            ):(
                                                                <img width="175px" height="250px" className='cover_image_dashboard' src = {ImgAsset.image_placeholder}/>
                                                            )
                                                        }
                                                        
                                                    </Col>
                                                    <Col>
                                                        <Row>
                                                            <h2 className='list_story_title'>{story.title}</h2>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6}>
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
                                                </Col>
                                                </Link>   
                                                       
                                                </>
                                            )
                                        })
                                    }
                                    </Row> 
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

export default AuthorPage;