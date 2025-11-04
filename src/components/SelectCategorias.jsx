import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SelectCategorias = ({value, onChange})=>{
    const [categorias, setCategorias] = useState([])

    useEffect(()=>{
        const fetchCaregorias = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/categories",{
                    method:'GET',
                    headers: {"Content-Type":"application/json"}
                })
                if (!response.ok){
                    throw new Error("Eroor al obtener las categorias")
                }
                const data = await response.json()
                setCategorias(data)
            } catch (error) {
                toast.error("Error en el servidor")
            }
        }
        fetchCaregorias()
    }, [])

    return(
        <div>
            <label htmlFor="categoria">Categorias:</label>
            <select name="categoria" id="categoria" value={value} onChange={(e)=>onChange(e.target.value)}>
                <option value="">Selecciona una</option>
                {categorias.map((categoria)=>(
                    <option key={categoria.id} value={categoria.id}>{categoria.type_category}</option>
                ))}
            </select>
        </div>
    )
}
export default SelectCategorias