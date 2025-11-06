import React, {useState, useEffect} from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import InfoToken from "./InfoToken";
import { toast } from "react-toastify";
import DeletePost from "./DeletePost";

const Posts = () => {
    const navigate = useNavigate()
    const info = InfoToken()
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        if(!info) return

        const fetchPosts = async () =>{
            try{
                const res = await fetch('http://127.0.0.1:5000/posts',{
                    method:'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })

                if(!res.ok) throw new Error ("Error al obtener el post")
                const data = await res.json()
                setPosts(data)
            } catch (error) {
                toast.error(error)
            }
            
        }
        fetchPosts()
    },[info])

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
        {posts.length === 0 ? (
            <p>No hay publicaciones realizadas</p>
        ) : <div>
            <ul>
               {[...posts].reverse().map((p)=>(
                <li>
                    <h2>{p.title}</h2>
                    <p>{p.content}</p>
                    <p>{p.created_at}</p>
                    <p>{p.category.type_category}</p>
                    {info?.role === "admin" && ( 
                    <Button label="Eliminar" severity="danger" onClick={() => handleDelete(p.id)}
                    />
                    )}
                </li>
                    ))}
            </ul>
            </div>
        }

    </div>
)}
export default Posts