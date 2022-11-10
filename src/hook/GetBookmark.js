import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';


export default function GetBookmark (props){
	const story_id = props.story_id;
    const [Bookmark, setBookmark] = useState(1);

    useEffect(() => {
		axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getBookmark/${story_id}`)
          .then((response) => {
            console.log("Bookmark : ", response);
            setBookmark(response.data);
        })
        .catch((err) => {
            console.log(err);
        });

	},[]); 

	return (<>{Bookmark.length}</>);
}
 
 