import React from 'react';
import ImgAsset from '../resources';
import { useState, useEffect } from "react";
import ReactTimeAgo from 'react-time-ago'
import '../css/storybrowse.css'
import '../css/updatespage.css'

import { Card, Container, Row, Col , Button, ListGroup, Badge} from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from "axios";

export default function ListChapter (props) {

	const [chapters, setChapter] = useState([]);
    const [listChapters, setListChapter] = useState([]);
    const [flag, setFlag] = useState(false); 
    
    const story_id = props.story_id;
	
	useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/chapter/story/${story_id}`)
        .then((response) => {
            console.log("Total Chapter : ", response.data.length);
            const chapterAsc = [...response.data].sort((a, b) => a.number - b.number);
            const chapterDesc = [...response.data].sort((a, b) => b.number - a.number);
            setChapter(chapterDesc);
            setListChapter(chapterAsc);
            setFlag(true);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    console.log(chapters);

    return (
		<>
        {
            flag === false ? (
                <p className='p_note'><i>There are no chapter in this story yet</i></p>
            ):(
                <>
                {
                    chapters.slice(0,4).map((chapter)=> {
                        const date = chapter.updated_at					
                        const dt = new Date(date)
                        return(
                            <Row className='row_chapter'>
                                <Col>
                                    <Link 
                                    to={`/story/${chapter.story.id}/chapter/${chapter.number}`}
                                    // state={{chapter_content: chapter, list_chapter: listChapters}}
                                    >
                                        <Badge bg="#B8D9A0" className='genre_badge' >
                                            {
                                                chapter.story.type !== "Novel" ? (
                                                    <>Read Story</>
                                                ):(
                                                    <>Chapter {chapter.number}</>
                                                )
                                            }                                                 
                                        </Badge>{' '}
                                    </Link>
                                </Col>
                                <Col ><span className="time_detail icon_text2"><i><ReactTimeAgo date={dt} locale="id"/></i></span>
                                </Col>
                            </Row>
                        )
                    })
                }
                </>
            )      
        }			
		</>
    )
}