import React, {useState, useEffect, useContext} from "react"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../Context/AuthContext";
import DeletePost from "./DeletePost";
import "../style/Post.css"

const MiPerfil = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const {user,token} = useContext(AuthContext)
    
    const fetchPosts = async ()=>{
        try{
            const res = await fetch('http://127.0.0.1:5000/my_posts',{
                method:"GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if(!res.ok) throw new Error ("Error al obtener el post")
            const data = await res.json()
            setPosts(data)
        }catch(error){
            toast.error(error)
        }
    }

    useEffect(()=>{
        if(user){
        fetchPosts()
        }
    },[user])

    

    const handleDelete = async (id) => {
        try {
            await DeletePost(id, token)
            setPosts(posts.filter((p) => p.id !== id))
            toast.success("Post eliminado correctamente")
        } catch (error) {
            toast.error(error.message)
        }
    }
    console.log(user)

return(
    <div>
        <Button className="post-form-button" type="button" label="volver" onClick={() => (user.role === 'user' ? navigate('/homeinside') : navigate('/homeinsideadminmod') )} />
        <h2 className="title-page-miperfil">Tu muro"{user?.name}"</h2>
        <h3 className="subtitle-page-miperfl">Tus Posteos</h3>
        
        {posts?.length === 0 ? (
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
                        <Button label="Eliminar" severity="danger" onClick={() => handleDelete(p.id)}/>
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