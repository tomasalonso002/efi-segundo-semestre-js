import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

const Home=()=>{
    const navigate = useNavigate()

    return(
        <div className="home-container">
        <Fragment>
            <h1>Bienvenidos a Like</h1>
            <div className="button-container">
            <Button label="Iniciar Sesion" onClick={()=>navigate('/login')}/>
            <Button label="Registrarse" onClick={()=>navigate('/registrarse')}/>
            </div>
        </Fragment>
        </div> 
    )
}
export default Home