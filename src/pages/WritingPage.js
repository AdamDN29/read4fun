import { useState, useEffect, useReducer } from "react";
import ImgAsset from '../resources';
import '../css/chapterPage.css'
import { scrollToTop } from "../helper/scroll";

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Form, FormGroup } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import Swal from "sweetalert2"

const initialState = {
    title: "",
    number: "",
	content: "",
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case "title":
            return { ...currentState, title: action.payload };
        case "number":
            return { ...currentState, number: action.payload };
		case "content":
            return { ...currentState, content: action.payload };
        default:
            return currentState;
    }
}

function WritingPage() {
    const location = useLocation();
    const {chapter_content} = location.state;
    console.log(chapter_content);

    const navigate = useNavigate();

    const [thisChapter, setThisChapter] = useState(chapter_content);
    const [disable, setDisable] = useState(false);

    const [chapter, dispatch] = useReducer(reducer, initialState);
    console.log(chapter);

    useEffect(() => {
        if (thisChapter.id === 0){
            setDisable(true);
        }
    }, [])
    
    const submitData = (e) => {
		e.preventDefault();
		console.log(chapter);
	
		const dataForm = new FormData();
        // Dataform Create Chapter
        if (thisChapter.id === 0){
            dataForm.append("story_id", thisChapter.story.id);
        } 
        // Dataform Update Chapter
        else{
            dataForm.append("id", thisChapter.id);
        }
		
		if (chapter.title !== ""){
			dataForm.append("title", chapter.title);
		}
		if (chapter.number !== ""){
			dataForm.append("number", chapter.number);
		}
		if (chapter.content !== ""){
			dataForm.append("content", chapter.content);
		}

        // Create Chapter
        if (thisChapter.id === 0){
            axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/chapter/create`, dataForm)
            .then((response) => {
                console.log(response)

                Swal.fire({
                    icon: 'success',
                    title: 'Create Chapter Succesfull',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#B8D9A0',
                    preConfirm: () => {
                        navigate(-1);
                    }	  
                }) 		
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Create Chapter Failed',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#D3455B',
                }) 
                return;
            });
        } 
        // Update Chapter
        else{
            axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/chapter/update/${thisChapter.id}`, dataForm)
            .then((response) => {
                console.log(response)

                Swal.fire({
                    icon: 'success',
                    title: 'Edit Chapter Succesfull',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#B8D9A0',
                    preConfirm: () => {
                        navigate(-1);
                    }	  
                }) 		
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Edit Chapter Failed',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#D3455B',
                }) 
                return;
            });
        }	
		
	};

    
    // Delete Chapter
    const deleteChapter = () => {
        Swal.fire({
            icon: 'question',
            title: 'Are you sure you want to delete this chapter ?',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: '#D3455B',
            confirmButtonText: 'Delete',
            showCancelButton: true,
            preConfirm: () => {
                axios
                .delete(`${process.env.REACT_APP_BACKEND_URL}/api/chapter/delete/${thisChapter.id}`)
                .then((response) => {
                    console.log(response)

                    Swal.fire({
                        icon: 'success',
                        title: 'Delete Chapter Succesfull',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonColor: '#B8D9A0',
                        preConfirm: () => {
                            navigate(-1);
                        }	  
                    }) 		
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Delete Chapter Failed',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonColor: '#D3455B',
                    }) 
                    return;
                });
            }	  
        }) 	
    }

    function backBtn (){
        scrollToTop();
        navigate(-1);
    }

    const handleCkEditorState = (event, editor) => {
        const data = editor.getData();
        dispatch({ type: "content", payload: data });
    }

    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            <div className='title_chapter_box'>
                <Row className="title_row">
                    <Col md={8}>
                        <div >
                            <Link className="link" 
                            to={`/userstory/${thisChapter.story.title}`}
                            state={{story_id: thisChapter.story.id}}
                            >
                                <span className="titleSection">{thisChapter.story.title}</span>
                            </Link>
                        </div>
                    </Col>
                    <Col md='4'>
                        <Button onClick={deleteChapter} className="btn_delete_chapter " disabled={disable}> 
                            <span>Delete Chapter</span>
                        </Button>
                        <Button onClick={submitData} className="btn_save_chapter " > 
                            <span>Save Chapter</span>
                        </Button>
                    </Col>
                </Row>

                {
                    thisChapter.story.type === "Novel" ?(
                        <>
                            <Row>
                                <Col md="auto">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Chapter Number</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Chapter Number" 
                                            name='number'
                                            defaultValue ={thisChapter.number}
                                            onBlur={(e) =>
                                                dispatch({ type: "number", payload: e.target.value })
                                            }
                                            />
                                    </Form.Group>
                                </Col>
                                <Col >
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Chapter Title</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Chapter Number" 
                                            name='number'
                                            defaultValue ={thisChapter.title}
                                            onBlur={(e) =>
                                                dispatch({ type: "title", payload: e.target.value })
                                            }
                                            />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </>
                    ):(<></>)
                }
                
            </div>

            <div className='content_editor_field'>
                
                <CKEditor
                    className='editor'
                    editor={ ClassicEditor }
                    data={thisChapter.content}
                    toolbar="false"
                    onReady={ editor => {
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }

                    onBlur={handleCkEditorState}
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
            <Row>
                <Col>
                <Button onClick={backBtn} className="btn_back_chapter "> 
                            <span>Back</span>
                        </Button>
                        <Button className="btn_save_chapter " onClick={submitData}> 
                            <span>Save Chapter</span>
                        </Button>
                </Col>
            </Row>
            
        </Container>
        <Footer />   
        </div>
    );
}

export default WritingPage;