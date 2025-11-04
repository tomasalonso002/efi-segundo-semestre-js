import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import useLogout from "./Autentication/Logout";


const HomeInside=()=>{
    const navigate = useNavigate()
    const logout = useLogout()

    return(
        <div className="home-container">
        <Fragment>
            <h1>Bienvenidos a Like</h1>
            <div className="button-container">
                <Button label="NewPost" onClick={()=>navigate('/post')}/>
                <Button label="Cerrar Sesion" onClick={logout} />
            </div>
        </Fragment>
        </div> 
    )
}
export default HomeInside