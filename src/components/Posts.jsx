import React, {useState, useEffect, useContext} from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeletePost from "./DeletePost";
import { AuthContext } from "../Context/AuthContext";

const Posts = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const {user,token} = useContext(AuthContext)
    
const fetchPosts = async () =>{
    try{
        const res = await fetch('http://127.0.0.1:5000/posts',{
            method:'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if(!res.ok) throw new Error ("Error al obtener el post")
        const data = await res.json()
        setPosts(data)
    } catch (error) {
        toast.error(error)
    }
    
}
    useEffect(()=>{
        if(user) {
        fetchPosts()
        }
    },[user])

    const handleDelete = async (id) => {
         const token = localStorage.getItem("token")
        try {
            await DeletePost(id, token)
            setPosts(posts.filter((p) => p.id !== id))
            toast.success("Post eliminado correctamente")
        } catch (error) {
            toast.error(error.message)
        }
    }
    
return(
    <div>
        {posts?.length === 0 ? (
            <p>No hay publicaciones realizadas</p>
        ) : <div>
            <ul>
               {[...posts]?.reverse().map((p)=>(
                <li>
                    <h2>{p.title}</h2>
                    <p>{p.content}</p>
                    <p>{p.created_at}</p>
                    <p>{p.category.type_category}</p>
                    {user?.role === "admin" && ( 
                    <Button label="Eliminar" severity="danger" onClick={() => handleDelete(p.id)}/>,
                    <Button label="Editar"  />
                    )}
                </li>
                    ))}
            </ul>
            </div>
        }

    </div>
)}
export default Posts