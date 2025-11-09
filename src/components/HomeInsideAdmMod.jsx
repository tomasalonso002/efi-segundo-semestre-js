import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import useLogout from "./Autentication/Logout";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

import "../style/HomeInside.css"

const HomeInsideAdminMod=()=>{
    const navigate = useNavigate()
    const logout = useLogout()
    const {user} = useContext(AuthContext)
    return(
        <div className="home-container">
        <Fragment>
            <h1 className="title-page-homeinside">Bienvenidos "{user.name}" a Klick!</h1>
            <div className="button-container">
                <Button className="button" label="Nuevo Posteo" onClick={()=>navigate('/new_post')}/>
                <Button className="button" label="Mi Perfil" onClick={()=>navigate('/miperfil')}/>
                <Button className="button" label="Cerrar Sesion" onClick={logout} />
                <Button className="button" label="Posteos" onClick={()=>navigate('/posteos')}/>
                <Button className="button" label="Crear Categorias" onClick={()=>navigate('/nuevacategoria')} />
            </div>
        </Fragment>
        </div> 
    )
}
export default HomeInsideAdminMod