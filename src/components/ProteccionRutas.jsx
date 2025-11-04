import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token')

    if (!token){
        return <Navigate to='/homeoutside' replace/>
    }
    return children
}

export default PrivateRoute