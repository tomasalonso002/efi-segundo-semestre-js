import { Button } from "primereact/button";
import React, {useState, useEffect, useContext} from "react"
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import "../style/PostComments.css"
import DeleteComment from "./DeleteComment";
const PostComments = ({postId, token}) =>{
    const [comments, setComments] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        const fetchComments = async () =>{
            try {
                const res = await fetch(`http://127.0.0.1:5000/post/${postId}/comments`,{
                    method:"GET",
                    headers: {
                       Authorization: `Bearer ${token}`,
                    }
                })
                if(!res.ok) throw new Error ("Error al obtener el comentario")
                const data = await res.json()
                setComments(data)
                
            } catch (error) {
                toast.error(error)
            }
        }
        fetchComments()
    },[postId, token])

    const handleDelete = async (id) =>{
        try { 
            await DeleteComment(id, token)
            setComments(comments.filter((c)=>c.id!==id))
            toast.success("Comentario Eliminado correctamente")
        } catch (error) {
            toast.error(error.message)
            
        }
    }
    return(
        <div>
            <h2>Comentarios</h2>
            {comments?.length===0 ? (
                <p>No hay comentarios</p>
            ): <div>
                    <ul>
                        {[...comments].reverse().map((c)=>(
                            <div className="container-comment">
                                <p>{c.text_comment}</p>
                                <p>{c.autor.name}</p>
                                <p>{c.created_at}</p>
                                <div>
                                    {(c.user_id === user.id ||user.role === "admin" || user.role === "moderador") && (
                                        <Button label="Eliminar" severity="danger" onClick={()=> handleDelete(c.id)} />    
                                    )}
                                </div>
                            </div>


                        ))}        
                    </ul>
                </div>}
        </div>
    )
}

export default PostComments