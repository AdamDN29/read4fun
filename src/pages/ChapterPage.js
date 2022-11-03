import React from 'react';
import { useState, useEffect, Text } from "react";
import ImgAsset from '../resources'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import '../css/chapterPage.css'
import { scrollToTop } from '../helper/scroll';

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Form } from 'react-bootstrap'
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function ChapterPage(props) {
    const location = useLocation();
    const {chapter_content, list_chapter } = location.state;
    console.log(chapter_content);
    console.log(list_chapter);

    const [thisChapter, setThisChapter] = useState(chapter_content);
    console.log(thisChapter);

    const [prevChapter, setPrevChapter] = useState([]);
    const [nextChapter, setNextChapter] = useState([]);
    const [btnStatusPrev, setbtnStatusPrev] = useState(true);
    const [btnStatusNext, setbtnStatusNext] = useState(true);
    
    useEffect(() => {
        
        setButton();
        
        // ClassicEditor
        // .create( document.querySelector( 'editor' ) )
        // .then( editor => {
        //     console.log( editor );
        // } )
        // .catch( error => {
        //     console.error( error );
        // } );

        ClassicEditor
            .create( document.querySelector( 'editor1' ), {
               
            } )
            .then( editor => {
                const toolbarElement = editor.ui.view.toolbar.element;
                editor.enableReadOnlyMode( 'feature-id' );

                toolbarElement.style.display = 'none';
                 
            } )
            .catch( error => {
                console.log( error );
            } );



    }, [thisChapter]);

    function setButton (){
        scrollToTop();
        list_chapter.map((chapter, index) => {
            if (chapter.id === thisChapter.id){
                console.log("Finded with Index : ",index)
                    if ((index - 1) >= 0){
                        console.log("Prev Chapter : True")
                        setPrevChapter(list_chapter[index - 1]);
                        setbtnStatusPrev(false);
                        console.log(prevChapter)
                    }else{
                        setbtnStatusPrev(true);
                        console.log("Prev Chapter : False")
                    }
                    if ((index + 1) !== list_chapter.length){
                        console.log("Next Chapter : True")
                        setNextChapter(list_chapter[index + 1]);
                        setbtnStatusNext(false);
                        console.log(nextChapter)
                    }else{
                        setbtnStatusNext(true);
                        console.log("Next Chapter : False")
                    }
            }
        })
    }

    

    function prevChapterClick (){
        // window.location.href = '/story/' + thisChapter.story.title + '/chapter'
        // window.location.reload(false);
        setThisChapter(prevChapter);
        console.log(thisChapter);
        setButton();
        
    }

    function nextChapterClick (){
        setThisChapter(nextChapter);
        console.log(thisChapter);
        setButton();
        
        // window.location.reload(true);
    }


    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            <div className='title_chapter_box'>
                <Row className="title_row">
                    <Col md={10}>
                        <div >
                            <Link className="link" 
                            to={`/story/${thisChapter.story.title}`}
                            state={{story_id: thisChapter.story_id}}>
                                <h1 className="titleSection">{thisChapter.story.title}</h1>
                            </Link>
                        </div>
                    </Col>
                    <Col md={2}>
                        <Button className="downloadSection"> 
                            <span>Download</span>
                        </Button>
                    </Col>
                </Row>

                {
                    thisChapter.story.type === "Novel" ?(
                        <>
                            <Row>
                                <Col md={12}>
                                    <div className='chapterSection'>
                                        <p>Chapter {thisChapter.number} : {thisChapter.title}</p>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    ):(<></>)
                }
                
            </div>

            {/* <div id="editor1" className='content_field' defaultValue={thisChapter.content}>
            </div> */}
            <div className='editor_field'>
            <CKEditor
                    id="editor1"
                    disabled 
                    config={ {
                        toolbar : 'none'
                    } }
                    className='content_field'
                    editor={ ClassicEditor }
                    data={thisChapter.content}
                    
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                />
            </div>
                
            
            {/* <div className='content_field'>
                <span className='contents'>{thisChapter.content}</span>
            </div> */}
            {/* <div className='content_field'>
                
                <textarea disabled='disabled' cols={150} rows={10} className='content' defaultValue={thisChapter.content}>

                </textarea>
                <Form.Control as="textarea" rows="auto" defaultValue={thisChapter.content} type="text" placeholder="Readonly input here..." readOnly />
            </div> */}
            {
                thisChapter.story.type === "Novel" ? (
                    <div className="buttonSection">
                
                    <Button className='btn_chapter' disabled={btnStatusPrev} onClick={prevChapterClick}>
                        {/* <Link className="link_to" 
                        to={`/story/${chapter_content.story.title}/chapter/${prevChapter.number}`}
                        state={{chapter_content: prevChapter, list_chapter: list_chapter}}
                        onClick={location.forceUpdate}> */}
                            <img src = {ImgAsset.icon_prev_chapter}
                            className="img_btn_prev_chapter"
                            alt="prev chapter"
                            /> Prev Chapter
                        {/* </Link> */}
                    </Button>
                    
                    <Button className='btn_chapter'>
                        <Link className="link" 
                        to={`/story/${chapter_content.story.title}`}
                        state={{story_id: chapter_content.story.id}}
                        onClick={location.forceUpdate}>
                            <img src = {ImgAsset.icon_story_chapter}
                            // className="img_btn_prev_chapter"
                            alt="story chapter"
                            /> 
                        </Link>
                    </Button>

                    <Button className='btn_chapter' disabled={btnStatusNext} onClick={nextChapterClick}>
                        {/* <Link className='link_to'
                        to={`/story/${chapter_content.story.title}/chapter/${nextChapter.number}`}
                        state={{chapter_content: nextChapter, list_chapter: list_chapter}}> */}
                            Next Chapter
                            <img src = {ImgAsset.icon_next_chapter}
                            className="img_btn_next_chapter"
                            alt="next chapter"
                            /> 
                        {/* </Link> */}
                    </Button>
            </div>
                ):(<></>)
            }
            
        </Container>
        <Footer />   
        </div>
    );
}

export default ChapterPage;