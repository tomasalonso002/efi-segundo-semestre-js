import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import useLogout from "./Autentication/Logout";
import InfoToken from "./InfoToken";

import "../style/HomeInside.css"

const HomeInside=()=>{
    const navigate = useNavigate()
    const logout = useLogout()
    const info = InfoToken()
    return(
        <div className="home-container">
        <Fragment>
            <h1 className="title-page-homeinside">Bienvenidos "{info.name}" a Klick!</h1>
            <div className="button-container">
                <Button className="button" label="Nuevo Posteo" onClick={()=>navigate('/new_post')}/>
                <Button className="button" label="Mi Perfil" onClick={()=>navigate('/miperfil')}/>
                <Button className="button" label="Cerrar Sesion" onClick={logout} />
                <Button className="button" label="Posteos" onClick={()=>navigate('/posteos')}/>
            </div>
        </Fragment>
        </div> 
    )
}
export default HomeInside