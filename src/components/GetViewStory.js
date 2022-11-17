import React from 'react';
import { useState, useEffect } from "react";
import ImgAsset from '../resources'
import '../css/ranking.css'
import axios from "axios";

function GetViewStory(props) {
    const story_id = props.story_id;

    const [story_view, setStoryView] = useState(null);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getView/${story_id}`)
          .then((response) => {
            console.log("View : ", response);
            setStoryView(response.data)
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
                    src = {ImgAsset.icon_view}
                />
                <span className="icon_text">
                    {story_view !== null ?(story_view):("1")}
                </span>
            </div>
        </div>
    )
}

export default GetViewStory;