import { Formik, Form, Field,ErrorMessage } from "formik"
import * as Yup from'yup'

import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../Context/AuthContext";

import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import DeleteCategory from "./DeleteCategory";

const validationSchema = Yup.object({
    type_category : Yup.string().required('No podes mandarlo vacio')
})

const NewCategory = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const {user, token} = useContext(AuthContext)

    const handleSubmit = async (values, { resetForm }) =>{
        try {
            const respose = await fetch ('http://127.0.0.1:5000/categories',{
                method: "POST",
                headers: {"Content-Type":"application/json", "Authorization": `Bearer ${token}`},
                body : JSON.stringify(values)
            })
            if(respose.ok){
                toast.success("Ctegoria creada correctamete")
                resetForm()
            }else{
                toast.error("No se pudo crear")
            }
        } catch (error) {
            toast.error("Hubo un error e el sevidor")
        }

    }

    const fetchCategories = async() => {
        try {
            const res = await fetch('http://127.0.0.1:5000/categories',{
            method:'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if(!res.ok) throw new Error("Error al obtener las categorias")
        const data = await res.json()
        setCategories(data)
        } catch (error) {
                toast.error(error)
        }
    }

    useEffect(()=>{
        if(user){
            fetchCategories()
        }
    },[user])

    const handleDelete = async (id) => {
        try {
            await DeleteCategory(id, token)
            setCategories(categories.filter((c)=>c.id !== id))
            toast.success("Categoriaborradacon exito")
        } catch (error) {
            toast.error(error.message)
        }
    }
    return(
        <div>
            <Button className="post-form-button" type="button" label="Volver" onClick={() => navigate('/homeinsideadminmod')} />
            <Formik 
                initialValues={{type_category:""}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
            {({isSubmitting, values, setFieldValues})=>(
                <Form>
                    <h2>Nueva categoria</h2>
                    <div className="post-form">
                        <label>Nombre categoria</label>
                        <Field as={InputText} id="type_category" name="type_category"/>
                        <ErrorMessage name="type_category" component="small" className="error"/>
                    </div>
                    <Button  className="post-form-button" type="submit" label={isSubmitting ? "Creando categoria...":"Crear categoria"}/>
                 </Form>
            )}
            </Formik>
        <div>
            <h2>Categorias ya creadas</h2>
            {categories?.length=== 0 ?(
                <p>No hay categorias cargadas</p>
            ):
            <div>
                <ul>
                    {[...categories]?.reverse().map((c)=>(
                        <li>
                            <h3>{c.type_category}</h3>
                            {user?.role === "admin" && (
                            <div> 
                                <Button label="Eliminar" severity="danger" onClick={() => handleDelete(c.id)}/>
                                <Button label="Editar"  />
                            </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            }
        </div>
        </div>
    
    )
}
export default NewCategory