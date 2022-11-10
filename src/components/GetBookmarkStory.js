import React from 'react';
import { useState, useEffect } from "react";
import ImgAsset from '../resources'
import '../css/ranking.css'
import axios from "axios";

function GetBookmarkStory(props) {
    const story_id = props.story_id;

    const [story_bookmark, setStoryBookmark] = useState(null);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getBookmark/${story_id}`)
          .then((response) => {
            console.log("Bookmark : ", response);
            setStoryBookmark(response.data)
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
                    src = {ImgAsset.icon_bookmark}
                />
                <span className="icon_text">
                    {story_bookmark !== null ?(story_bookmark):("1")}
                </span>
            </div>
        </div>
    )
}

export default GetBookmarkStory;