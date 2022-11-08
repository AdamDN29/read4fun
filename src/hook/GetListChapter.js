import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';


export default function GetListChapter (props){
    // const [chapters, setChapter] = useState([]);
    // console.log(props.thisStory);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/chapter`)
        .then((response) => {
            console.log("Total Chapter : ", response.data.length);
            const chapterAsc = [...response.data].sort((a, b) => a.number - b.number);
            const chapterDesc = [...response.data].sort((a, b) => b.number - a.number);
            // setChapter(chapterDesc);
            return chapterDesc;
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    // return true;
}
 
 