import React from 'react';
import { useState, useEffect } from "react";
import ImgAsset from '../resources'
import '../css/ranking.css'
import axios from "axios";

function GetLikeStory(props) {
    const story_id = props.story_id;

    const [story_like, setStoryLike] = useState(null);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getLike/${story_id}`)
          .then((response) => {
            console.log("Like : ", response);
            setStoryLike(response.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div>          
            <div className="detail_list2">
                <img
                    className="detail_list_icon"
                    src = {ImgAsset.icon_like}
                />
                <span className="icon_text">
                    {story_like !== null ?(story_like):("1")}
                </span>
            </div>
        </div>
    )
}

export default GetLikeStory;