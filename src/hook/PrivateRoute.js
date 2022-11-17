// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { useState } from "react";
import { Navigate , Route } from 'react-router-dom'

const PrivateRoute = ({ children }) => {

    // Add your own authentication on the below line.
    const [userId, setUserId] = useState(() => {
        const localData = sessionStorage.getItem("id");
        return localData ? localData : null;
    });

    return userId !== null ? children : <Navigate to="/login" />;
    
}

export default PrivateRoute