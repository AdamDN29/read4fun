import React from 'react';
import { useState, useEffect, Text } from "react";
import ImgAsset from '../resources'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import '../css/chapterPage.css'

//import component Bootstrap React
import { Card, Container, Row, Col , Button, Form } from 'react-bootstrap'
import axios from "axios";


function ChapterPage() {

    const [chapter, setChapter] = useState([]);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/chapter/1`)
          .then((response) => {
            setChapter(response.data);
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);


    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            <Row className="title_row">
                <Col md={10}>
                    <div className="titleSection">
                        <h1>{chapter.title}</h1>
                    </div>
                </Col>
                <Col md={2}>
                    <Button className="downloadSection"> 
                        <span>Download</span>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className='chapterSection'>
                        <p>Chapter {chapter.number} : {chapter.title}</p>
                    </div>
                </Col>
            </Row>
            <div className='content_field'>
                
                <span className='contents'>{chapter.content}</span>
            </div>
            {/* <div>
                <textarea disabled='disabled' className='content' defaultValue={chapter.content}>

                </textarea>
            </div> */}
            <div className="buttonSection">
                <a href="">
                    <img src = {ImgAsset.icon_prev_chapter}
                    className="prev_chapter"
                    alt="prev chapter"
                    />
                </a>
                <a href="/story">
                    <img src = {ImgAsset.icon_browse_chapter}
                    className="browse_chapter"
                    alt="browse chapter"
                    />
                </a>
                <a href="">
                    <img src = {ImgAsset.icon_next_chapter}
                    className="next_chapter"
                    alt="next chapter"
                    />
                </a>
            </div>
        </Container>
        <Footer />   
        </div>
    );
}

export default ChapterPage;