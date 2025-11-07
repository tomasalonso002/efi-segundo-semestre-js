const DeleteCategory = async (id, token) => {
    try{
        const res = await fetch(`http://127.0.0.1:5000/categories/${id}`,{
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ "is_active":0 }),
        })

        if(!res.ok){
            const errorData = await res.json()
            throw new Error(errorData.message || "Error al eliminar la categoria")
        }
        return await res.json();
    }catch(error){
       console.error("Error en DeleteCategory:", error);
    throw error; 
    }
}
export default DeleteCategory