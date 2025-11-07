import { Navigate } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


const PrivateRouteRole = ({ children }) => {
    const {user,token} = useContext(AuthContext)
    
    if (!token){
        return <Navigate to='/' replace/>
    }
    if(user.role === 'user'){
        return <Navigate to='/homeinside' replace/>
    }
    return children
}

export default PrivateRouteRole