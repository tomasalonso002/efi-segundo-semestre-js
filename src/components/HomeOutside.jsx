import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

import "../style/HomeOutside.css"

const HomeOutside=()=>{
    const navigate = useNavigate()

    return(
        <div className="home-container">
        <Fragment>
            <h1 className="title-page-homeoutside">Bienvenidos a Klick</h1>
            <div className="button-container">
                <Button className="button" label="Iniciar Sesion" onClick={()=>navigate('/login')}/>
                <Button className="button" label="Registrarse" onClick={()=>navigate('/registrarse')}/>
            </div>
        </Fragment>
        </div> 
    )
}
export default HomeOutside