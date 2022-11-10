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

const allType = [
	'Novel',
	'Short Story'
];

const allGenres = [
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
    type: "",
    status: "",
	description: "",
	link: null,
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case "title":
            return { ...currentState, title: action.payload };
        case "type":
            return { ...currentState, type: action.payload };
        case "status":
            return { ...currentState, status: action.payload };
		case "description":
            return { ...currentState, description: action.payload };
		case "link":
            return { ...currentState, link: action.upload };
        default:
            return currentState;
    }
}

function EditDetailPage() {
    const { story_id } = useParams();
    console.log(story_id);

    const [userId, setUserId] = useState(() => {
		const localData = sessionStorage.getItem("id");
		return localData ? localData : null;
	});

    const navigate = useNavigate();

    const [preload, setPreLoad] = useState([]);
    const [imagePlaceholder, setImagePlaceholder] = useState('');

    const [story, dispatch] = useReducer(reducer, initialState);
    const [genres, setGenre] = useState([1, 5, 7, 12, 21]);

    const [myGenre, setMyGenre] = useState([]); 

    useEffect(()=>{
        // Check if create or edit story
        if (story_id === "newStory"){
            const tempNewStory = {title : '', type : '', status : '', description : "", link : null ,user_id : userId};
            setPreLoad(tempNewStory);
        }
        else{
            // Get Data Story
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/story/${story_id}`)
            .then((response)=> {
                setPreLoad(response.data);
                setImagePlaceholder(response.data.link);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

            // Get Genre Story
            axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getGenre/${story_id}`)
            .then((response) => {
                console.log(response.data);
                setGenre(response.data);      
            })
            .catch((err) => {
                console.log(err);
            });
        }  
	},[])

    const genreChecker  = (genre_id)  => {
        let temps = false;
        genres.map((genre) => {
            if (genre === genre_id){
                temps = true;
            }
        })
        return temps;
    }

    const changeMyGenre =  (e) => {
        var num = Number(e.target.value)
        var array = [...myGenre]; 
        var index = array.indexOf(num)
        if (index !== -1) {
            array.splice(index, 1);
            setMyGenre(array);
        }else{
            setMyGenre(current => [...current, num]);
        }       
    }
    console.log ("List of My Genre : ", myGenre);

    function postMyGenre (){
        var array = [...genres]; 
        console.log("My Genre : ", myGenre)
        console.log("Story Genre : ", genres)
        
        myGenre.map((genre) => {
            var index = array.indexOf(genre)
            if (index !== -1) {
                console.log("Hapus Genre Story : ", genre)
            }else{
                console.log("Tambah Genre Story : ", genre)
            }
        })
    }

    function postData (dataForm){
        // Post Data Edit Story
        if (story_id !== "newStory"){
            axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/story/update/${story_id}`, dataForm)
            .then((response) => {
                console.log(response)
                Swal.fire({
                    icon: 'success',
                    title: 'Edit Detail Story Succesfull',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#B8D9A0',
                    preConfirm: () => {
                        // window.location.href = "/userstory";
                        // navigate(-1);
                    }	  
                }) 		
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Edit Detail Story Failed',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#D3455B',
                }) 
                return;
            });
        }
        // Post Data Create Story
        else{
            axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/story/create`, dataForm)
            .then((response) => {
                console.log(response)
                Swal.fire({
                    icon: 'success',
                    title: 'Create Detail Story Succesfull',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#B8D9A0',
                    preConfirm: () => {
                        // window.location.href = "/userstory";
                        // navigate(-1);
                    }	  
                }) 		
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Create Detail Story Failed',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#D3455B',
                }) 
                return;
            });
        }
    }

    function uploadImage (img, dataForm) {
        console.log("Image : ", img);
        let body = new FormData()
        body.set('key', 'fbf6a1214e399aee19712877bc787d54')
        body.append('image', img)
    
        return axios({
          method: 'POST',
          url: 'https://api.imgbb.com/1/upload',
          data: body
        })
        .then((response) => {
            console.log(response.data);
            console.log(response.data.data.display_url)

            dataForm.append("link", response.data.data.display_url);

            postData(dataForm);
        })
          .catch((err) => {
            console.log(err);
        });
      }

    const submitData = (e) => {
		e.preventDefault();
		console.log(story);
	
		const dataForm = new FormData();

        // Check if create or edit story
        // Edit
        if (story_id !== "newStory"){
            dataForm.append("id", story_id);
            if (story.type !== null){
                dataForm.append("type", story.type);
            }
            if (story.status !== null){
                dataForm.append("status", story.status);
            }
            if (story.description !== ""){
                dataForm.append("description", story.description);
            }

        }
        else{
            dataForm.append("user_id", userId);        
            if (story.type === ""){
                dataForm.append("type", "Novel");
            }else {dataForm.append("type", story.type);}
            if (story.status === ""){
                dataForm.append("status", "On Going");
            }else {dataForm.append("status", story.status);}
            if (story.description === ""){
                dataForm.append("description", "A New Story");
            }else{dataForm.append("description", story.description);}
        }
		if (story.title !== ""){
            dataForm.append("title", story.title);
        }

        if (story.link !== null){
            console.log(story.link);

            const reader = new FileReader()
            reader.readAsDataURL(story.link)      
            reader.onload = () => {
                console.log('called: ', reader)
                const img = reader.result.split(",").pop();
                uploadImage(img, dataForm);
        
                // postData(formData);
            }  
		}

        if (story.link === null){
            postData(dataForm);
        }   	
	};

    const onImageChange = (e) => {
        dispatch({ type: "link", upload: e.target.files[0], })

        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              setImagePlaceholder(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
          }
    }


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
                                    imagePlaceholder !== '' ?(
                                        <img src={imagePlaceholder} alt="Cover" width="250px"/>
                                    ):(
                                        <img src={ImgAsset.image_placeholder} alt="Cover" width="250px"/>
                                    )
                                }
                               
                                {/* <InputGroup size="md" className="upload_form mb-3">
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
                                </InputGroup>  */
                                <Form.Group controlId="formFileSm" className="upload_form mb-3">
                                    {/* <Form.Label>Small file input example</Form.Label> */}
                                    <Form.Control type="file" 
                                        placeholder="Enter Link of Story Cover"
                                        name="link"
                                        onChange={onImageChange}
                                        // onChange={(e) =>
                                        //     dispatch({ type: "avatar", upload: e.target.files[0], })
        
                                        // }        
                                    />
                                </Form.Group>}
                            </Col>

                            {/* Edit Detail */}
                            <Col>
                                <Form className='form_detail'>

                                    {/* Story Title Form */}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Story Title</Form.Label>
                                        <Form.Control
                                            required 
                                            type="title" 
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

                                    {/* Type Form */}
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className="label_form">Type</Form.Label>
                                        <Form.Select
                                            defaultValue ={preload.type}
                                            onChange={(e) =>
                                                dispatch({ type: "type", payload: e.target.value })
                                              }
                                        >
                                            {
                                                preload.type !== "" ? (
                                                    <>
                                                    <option value="">{preload.type}</option>
                                                    {
                                                        allType.map(post => {
                                                            if(post !== preload.type){
                                                                return(<option value={post}>{post}</option>)
                                                            }
                                                        })
                                                    }
                                                    </>
                                                ):(
                                                    <>
                                                    <option value="Novel">Novel</option>
                                                    <option value="Short Story">Short Story</option>
                                                    </>
                                                )
                                            }
                                        </Form.Select>
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
                                            {
                                                preload.status !== "" ? (
                                                    <>
                                                    <option value="">{preload.status}</option>
                                                    {
                                                        allStatus.map(post => {
                                                            if(post !== preload.status){
                                                                return(<option value={post}>{post}</option>)
                                                            }
                                                        })
                                                    }
                                                    </>
                                                ):(
                                                    <>
                                                    <option value="On Going">On Going</option>
                                                    <option value="Complete">Complete</option>
                                                    </>
                                                )
                                            }
                                            
                                        </Form.Select>
                                    </Form.Group>

                                    {/* Genre Form */}
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Label className="label_form">Genre</Form.Label>
                                        <Row xs={1} md={3}>
                                            {/* {allGenres.map((genre) => {  
                                                const checked_status = genreChecker(2);
                                                console.log(checked_status);

                                                return(
                                                <Col>
                                                    <Row>
                                                        <Col>
                                                        <Form.Check 
                                                        type="checkbox"
                                                        id={`${genre.id}`}
                                                        label={`${genre.label}`}
                                                        defaultChecked={checked_status}
                                                        className='form_check'
                                                        />
                                                        </Col>
                                                    </Row>
                                                </Col>            
                                                        
                                                )}
                                            ) } */}
                                            <Col xs={3}> 
                                                {allGenres.slice(0,7).map((genre) => {
                                                    const checked_status = genreChecker(genre.id);

                                                    return (               
                                                        <Form.Check 
                                                        type="checkbox"
                                                        id={`${genre.id}`}
                                                        label={`${genre.label}`}
                                                        defaultChecked={checked_status}
                                                        value={genre.id}
                                                        onChange={changeMyGenre}
                                                        className='form_check'
                                                        />
                                                    )}
                                                )}
                                            </Col>
                                            <Col xs={3}> 
                                                {allGenres.slice(7,14).map((genre) => {
                                                    const checked_status = genreChecker(genre.id);
                                                    return ( 
                                                        <Form.Check 
                                                        type="checkbox"
                                                        id={`${genre.id}`}
                                                        label={`${genre.label}`}
                                                        defaultChecked={checked_status}
                                                        value={genre.id}
                                                        onChange={changeMyGenre}
                                                        className='form_check'
                                                        />
                                                    )}
                                                )}   
                                            </Col>
                                            <Col xs={3}> 
                                                {allGenres.slice(14,21).map((genre) => {
                                                    const checked_status = genreChecker(genre.id);
                                                    return (
                                                        <Form.Check 
                                                        type="checkbox"
                                                        id={`${genre.id}`}
                                                        label={`${genre.label}`}
                                                        defaultChecked={checked_status}
                                                        value={genre.id}
                                                        onChange={changeMyGenre}
                                                        className='form_check'
                                                        />
                                                    )}
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

                                    <Button onClick={postMyGenre} variant="primary" className="btn_back" >
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