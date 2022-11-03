import React from 'react';
import ImgAsset from '../resources';
import '../css/editdetailpage.css'

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Form, InputGroup } from 'react-bootstrap'
import { useState, useEffect, useReducer } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"

const allStatus = [
	'On Going',
	'Complete'
];

const genres = [
    {id: 1, label: 'Action'},
    {id: 2, label: 'Adventure'},
    {id: 3, label: 'Comedy'},
    {id: 4, label: 'Drama'},
    {id: 5, label: 'Fantasy'},
    {id: 6, label: 'Historical'},
    {id: 7, label: 'Horror'},
    {id: 8, label: 'Magical Realism'},
    {id: 9, label: 'Martial Arts'},
    {id: 10, label: 'Mature'},
    {id: 11, label: 'Mystery'},
    {id: 12, label: 'Psychological'},
    {id: 13, label: 'Romance'},
    {id: 14, label: 'Real Experience'},
    {id: 15, label: 'Sci-Fi'},
    {id: 16, label: 'School Life'},
    {id: 17, label: 'Slice of Life'},
    {id: 18, label: 'Sports'},
    {id: 19, label: 'Supernatural'},
    {id: 20, label: 'Tragedy'},
    {id: 21, label: 'Video Games'},
];

const initialState = {
    title: "",
    status: "",
	description: "",
	link: "",
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case "title":
            return { ...currentState, title: action.payload };
        case "status":
            return { ...currentState, status: action.payload };
		case "description":
            return { ...currentState, description: action.payload };
		case "link":
            return { ...currentState, link: action.payload };
        default:
            return currentState;
    }
}

function EditDetailPage() {
    const { story_id } = useParams();
    console.log(story_id);

    const navigate = useNavigate();

    const [preload, setPreLoad] = useState([]);

    useEffect(()=>{
	    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/story/${story_id}`)
	    .then((response)=> {
			setPreLoad(response.data);
			console.log(response.data);
		})
		.catch((err) => {
			console.log(err);
		});
	},[])

    const [story, dispatch] = useReducer(reducer, initialState);
    const [disable, setDisable] = useState(false);	

    const submitData = (e) => {
		e.preventDefault();
		setDisable(true);
		console.log(story);
	
		const dataForm = new FormData();
		dataForm.append("id", story_id);
		if (story.title !== ""){
			dataForm.append("title", story.title);
		}
		if (story.status !== null){
			dataForm.append("status", story.status);
		}
		if (story.description !== ""){
			dataForm.append("description", story.description);
		}
		if (story.link !== ""){
			dataForm.append("link", story.link);
		}

		axios
		  .post(`${process.env.REACT_APP_BACKEND_URL}/api/story/update/${story_id}`, dataForm)
		  .then((response) => {
			console.log(response)
			setDisable(false);
			Swal.fire({
				icon: 'success',
				title: 'Edit Profile Berhasil',
				allowOutsideClick: false,
				allowEscapeKey: false,
				confirmButtonColor: '#B8D9A0',
				preConfirm: () => {
					// window.location.href = "/userstory";
                    navigate(-1);
				}	  
			}) 		
		  })
		  .catch((err) => {
			Swal.fire({
				icon: 'error',
				title: 'Edit Detail Story Gagal',
				allowOutsideClick: false,
				allowEscapeKey: false,
				confirmButtonColor: '#D3455B',
			}) 
			return;
		  });
		
	};


    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            <Card className="edit_detail card mx-1">
                <Card.Body className="edit_detail_body card-body">
                    <Card.Title className="edit_detail_title card-title">Edit Detail</Card.Title>
                        
                        <Row>
                            {/* Upload Cover */}
                            <Col md='auto' className="upload_col">

                                {
                                    preload.link !== null ?(
                                        <img src={preload.link} alt="Cover" width="250px"/>
                                    ):(
                                        <img src={ImgAsset.image_placeholder} alt="Cover" width="250px"/>
                                    )
                                }
                               
                                
                                <InputGroup size="md" className="upload_form mb-3">
                                    <InputGroup.Text id="basic-addon1" className='icon_upload'>
                                        <img
                                            src = {ImgAsset.icon_upload}
                                        />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Enter Link of Story Cover"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        name='link'
                                        type="text" 
                                        // defaultValue ={preload.link}
                                        onChange={(e) =>
                                            dispatch({ type: "link", payload: e.target.value })
                                        }
                                    />
                                    <Form.Text id="passwordHelpBlock" muted>
                                        Please enter a valid link of your story cover
                                    </Form.Text>
                                    {/* <InputGroup.Text id="basic-addon2"><Button className='btn_search2'>Search</Button></InputGroup.Text> */}
                                </InputGroup>
                            </Col>

                            {/* Edit Detail */}
                            <Col>
                                <Form className='form_detail'>
                                    {/* Story Title Form */}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Story Title</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="Enter Story Title" 
                                            name='title'
                                            defaultValue ={preload.title}
                                            onBlur={(e) =>
                                                dispatch({ type: "title", payload: e.target.value })
                                            }/>
                                        {/* <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                        </Form.Text> */}
                                    </Form.Group>
                                    {/* Status Form */}
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className="label_form">Status</Form.Label>
                                        <Form.Select
                                            defaultValue ={preload.status}
                                            onChange={(e) =>
                                                dispatch({ type: "status", payload: e.target.value })
                                              }
                                        >
                                            <option value="">{preload.status}</option>
                                            {
                                                allStatus.map(post => {
                                                    if(post !== preload.status){
                                                        return(<option value={post}>{post}</option>)
                                                    }
                                                })
                                            }
                                            
                                        </Form.Select>
                                    </Form.Group>
                                    {/* Genre Form */}
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Label className="label_form">Genre</Form.Label>
                                        <Row>
                                            <Col xs={3}> 
                                                {genres.slice(0,7).map((genre) => (               
                                                        <Form.Check 
                                                        type="checkbox"
                                                        id={`${genre.id}`}
                                                        label={`${genre.label}`}
                                                        className='form_check'
                                                        />
                                                    )
                                                )}
                                            </Col>
                                            <Col xs={3}> 
                                                {genres.slice(7,14).map((genre) => ( 
                                                        <Form.Check 
                                                        type="checkbox"
                                                        id={`${genre.id}`}
                                                        label={`${genre.label}`}
                                                        className='form_check'
                                                        />
                                                    )
                                                )}   
                                            </Col>
                                            <Col xs={3}> 
                                                {genres.slice(14,21).map((genre) => (
                                                        <Form.Check 
                                                        type="checkbox"
                                                        id={`${genre.id}`}
                                                        label={`${genre.label}`}
                                                        className='form_check'
                                                        />
                                                    )
                                                )}   
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    {/* Description Form */}
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label className="label_form">Description</Form.Label>
                                        <Form.Control as="textarea" 
                                            placeholder="Enter the Description" 
                                            rows={5} 
                                            name="description" 
                                            defaultValue ={preload.description}
                                            onBlur={(e) =>
                                                dispatch({ type: "description", payload: e.target.value })
                                            }
                                            />
                                    </Form.Group>
                                    <Button onClick={()=> navigate(-1)} variant="primary" className="btn_back" >
                                        Back
                                    </Button>
                                    <Button variant="primary"  className="btn_save" type="submit" onClick={submitData}>
                                        Save Detail
                                    </Button>
                                    
                                </Form>
                            </Col>

                        </Row>
                </Card.Body>
            </Card>
            
        </Container>
        <Footer />   
        </div>
    );
}

export default EditDetailPage;