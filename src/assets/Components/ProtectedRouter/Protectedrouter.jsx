import React from 'react'
import { Navigate } from "react-router-dom"

const UserProtectedRoute= ({ children}) => {
    const User = JSON.parse(localStorage.getItem("User"));
    // console.log(User,"prottectd routil yethiiiiiii");
    return User ? children: <Navigate to={"/"}/>
}
export default UserProtectedRoute
