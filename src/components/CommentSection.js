import React from 'react';
import { useState, useEffect, useReducer, useRef } from "react";
import ImgAsset from '../resources'
import '../css/storypage.css'
import axios from "axios";
import ReactTimeAgo from 'react-time-ago'
import Swal from "sweetalert2"

import { Spinner, Container, Row, Col , Button, Badge, Form, FloatingLabel } from 'react-bootstrap';

const initialState = {
    comment: "",
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case "comment":
            return { ...currentState, comment: action.payload };
        default:
            return currentState;
    }
}

function CommentSection(props) {
    const userId = props.userId;
    const story_id = props.story_id;
    const [user, setUser] = useState([]);
    const [comments, setComments] = useState([]);
    const [comentator, setComentator] = useState([]);
    const [textValue, setTextValue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [userComment, dispatch] = useReducer(reducer, initialState);

    // Get Profile User
    useEffect(() => {	
		if (userId !== null){	
			axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/${userId}`)
			.then((response)=> {
				console.log(response);
				setUser(response.data.data);	
			})
            .catch((err) => {
                console.log(err);
            });
		}		
	}, [])

    // Get Comment Story
    useEffect(() => {	
		if (userId !== null){	
			axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/story/commentUserId/${story_id}`)
			.then((response)=> {
				console.log(response);
                const sortedComment = response.data.sort((a, b) => new Date(...b.updated_at.split('/').reverse()) - new Date(...a.updated_at.split('/').reverse()));
				setComments(sortedComment);	
                setIsLoading(false);
			})
            .catch((err) => {
                console.log(err);
            });
		}		
	}, [])

    const submitData = (e) => {
        e.preventDefault();
		console.log(userComment);

        const dataForm = new FormData();

        dataForm.append("story_id", story_id);
        dataForm.append("username", user.username);
        dataForm.append("comment", userComment.comment);

        if (user.avatar !== null){
            dataForm.append("avatar_link", user.avatar);
        }else{
            dataForm.append("avatar_link", "");
        }

        if(userComment.comment !== ""){
            console.log("Comment !")
            axios
            .create({
                headers: {
                  Authorization : `Bearer ${sessionStorage.getItem("token")}`
                  }
                })
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/story/comment`, dataForm)
            .then((response) => {
                console.log(response.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Comment Succesfull',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#B8D9A0',
                    preConfirm: () => {
                        getComment();
                    }	  
                }) 
                handleReset();		
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Comment Failed',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#D3455B',
                }) 
                return;
            });
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Please fill in the comments ',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#B8D9A0', 
            }) 		
        }

    }

    const formRef = useRef(null);
    const handleReset = () => {
        formRef.current.reset();
      };

    function getComment (){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/story/commentUserId/${story_id}`)
		.then((response)=> {
			console.log(response);
            const sortedComment = response.data.sort((a, b) => new Date(...b.updated_at.split('/').reverse()) - new Date(...a.updated_at.split('/').reverse()));
			setComments(sortedComment);	
		})
        .catch((err) => {
            console.log(err);
        });
    }
    
    const getProfileComment = (commentator_id) => {
        // let comentator = [];
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/${commentator_id}`)
			.then((response)=> {
				console.log(response);
				setComentator(response.data.data);	
			})
            .catch((err) => {
                console.log(err);
        });
    }

    return (
       
        <>
         {/* Comments Section */}
        <div className='info_section'> 
        <h1 className='section_title3'>Comments</h1>
        <div className='comment_field'>
            {/* User Comment Field */}
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
                                <Form ref={formRef} onSubmit={submitData}>
                                    <FloatingLabel
                                        controlId="floatingTextarea"
                                        label="Comment"
                                        className="mb-3"
                                    >
                                        <Form.Control as="textarea" 
                                            placeholder="Leave a comment here" 
                                            ref={formRef}
                                            onBlur={(e) =>
                                                dispatch({ type: "comment", payload: e.target.value })
                                            }
                                        />
                                    </FloatingLabel>
                                    <Button className='btn_comment_form' type='submit'>Post Comment</Button>
                                </Form>
                                    
                                    
                                </div>
                                </>                    
                            )
                        }

                    </div>
                </Col>
            </Row>
        </div>

        <div className='release_content'>
            { comments.length !== 0 ? (
                <>{comments.length} Comments</>
            ):(<i>There is no comment in this story</i>) 
            }
            
        </div>

        <div>
        {
          isLoading === true ? (
            <center>
              <Spinner size="sm" animation="border" width="500px" height="500px"/> 
            </center>
          ):
          (<>
            {
                <>
                { comments.length === 0 ? (
                    <center>
                        <img
                            width="400px" height="400px"
                            // className="detail_list_icon"
                            src = {ImgAsset.img_comment}
                        />
                        <p className='first_comment'>Be The First Comment</p>
                    </center>
                ):
                (
                    <>
                    {
                        comments.map((comment) => {
                            const date = comment.updated_at					
                            const dt = new Date(date)
                            // getProfileComment(comment.user_id);
                            return (
                                <div className='comment_field2'>
                                    <Row>
                                        <Col xs={1} > 
                                            {
                                                comentator.avatar !== null ?(
                                                    <img
                                                        style={{width: 50, height: 50, borderRadius: 50/ 2}}
                                                        className='avatar_place'
                                                        src = {comment.avatar_link}
                                                    />
                                                ):(
                                                    <img
                                                        className='avatar_place'
                                                        src = {ImgAsset.avatar2}
                                                    />
                                                )
                                            }
                                            
                                        </Col>
                                        <Col > 
                                            <p className='comment_username'>{comment.username}</p>
                                            <p className='comment_date'><ReactTimeAgo date={dt} locale="en-US"/></p>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col xs={1}></Col>
                                        <Col > 
                                            <div className='comment_content_box'>
                                                <p className='comment_content'>{comment.comment}</p>
                                            </div>  
                                        </Col>
                                    </Row>
                                </div>
                            )
                        }
                        )
                    }
                    </>
                ) 
                }
                </>
            }
          </>
          )
        }
            
            
        </div>

        

        {/* <div className='comment_field2'>
            
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
        </div> */}

        </div>
        </>
    )
}

export default CommentSection;