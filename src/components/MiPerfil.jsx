import React, {useState, useEffect} from "react"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"
import InfoToken from "./InfoToken"
import { toast } from "react-toastify"

import "../style/Post.css"

const MiPerfil = () => {
    const navigate = useNavigate()
    const info = InfoToken()
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        if(!info) return;

        const fetchPosts = async ()=>{
            try{
                const res = await fetch('http://127.0.0.1:5000/my_posts',{
                    method:"GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                
                if (!res.ok) throw new Error("Error al obtener el post")
                
                const data = await res.json()
                setPosts(data)
            }catch(error){
                toast.error(error)
            }
        }
        fetchPosts()
    }, [info])


return(
    <div>
        <Button className="button" type="submit" label="Volver al Inicio" onClick={()=>navigate('/homeinside')}/>
        <h2 className="title-page-miperfil">Tu muro "{info.name}"</h2>
        <h3 className="subtitle-page-miperfl">Tus Posteos</h3>

        {posts.length === 0 ? (
            <p>No tenes publicaciones realizadas</p>
        ) : <div  className="posts-contaner">
            <ul>
            {[...posts].reverse().map((p)=>(
                <div className="post-container">
                    <h2>{p.title}</h2>
                    <p>{p.content}</p>
                    <p>{p.created_at}</p>
                    <p>{p.category.type_category}</p>
                    <div className="button-post-conteiner">
                        <Button className="button" type="submit" label="Eliminar"/>
                        <Button className="button" type="submit" label="Editar"/>
                    </div>
                </div>
            ))}
            </ul>
            </div>
        }
    </div>
)}
export default MiPerfil