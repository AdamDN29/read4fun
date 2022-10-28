import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';


export default function CheckUser (props){
    const [user, setUser] = useState([]);

    const {userId} = props;
    console.log(userId);

    useEffect(() => {
		axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/${userId}`)
		.then((response) => {
                console.log(response.data.data);
			    setUser(response.data.data);
		})
		.catch((err) => {
			console.log(err);
		});

	},[]); 

	return user.username;
}
 
 