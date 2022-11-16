import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';


export default function GetLike (props){
	const story_id = props.story_id;
    const [Like, setLike] = useState(0);

    useEffect(() => {
		axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getLike/${story_id}`)
          .then((response) => {
            console.log("Like : ", response);
            setLike(response.data);
        })
        .catch((err) => {
            console.log(err);
        });

	},[]); 

	return (<>{Like}</>);
}
 
 