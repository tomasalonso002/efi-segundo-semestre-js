import { Formik, Form, Field,ErrorMessage } from "formik"
import * as Yup from'yup'

import { useState, useEffect } from "react"

import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import SelectCategorias from "./SelectCategorias"

const validationSchema = Yup.object({
    title: Yup.string().required('El titulo es obligatorio'),
    content: Yup.string().required('El contenido es obligatorio'),
    category_id: Yup.number().required('La categoria es obligatoria')
})



const NewPost =()=>{
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const handleSubmit = async (values, { resetForm }) => {
        try{
            const response = await fetch ('http://127.0.0.1:5000/post', {
                method:'POST',
                headers: {"Content-Type":"application/json", "Authorization": `Bearer ${token}`},
                body : JSON.stringify(values)
            })
            if (response.ok){
                toast.success("Post creado correctamente")
                resetForm()
                setTimeout(()=>navigate('/'),2000)
            }else{
                toast.error("Hubo un errore")
            }
        }catch (error) {
            toast.error("Hubo un error e el sevidor")
        }
        
    }
    return(
        <div>
            <h2>Crear un posteo</h2>
            <Formik
                initialValues={{title:"", content: "", category_id:""}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting, values, setFieldValue})=>(
                    <Form>
                        <div className="post-form">
                            <label>Titulo</label>
                            <Field as={InputText} id="title" name="title"/>
                            <ErrorMessage name="title" component="small" className="error"/>
                        </div>
                        <div className="post-form">
                            <label>Contenido</label>
                            <Field as={InputText} id="content" name="content"/>
                            <ErrorMessage name="content" component="small" className="error"/>
                        </div>
                        <div>
                            <SelectCategorias
                            value={values.category_id}
                            onChange={(value)=>setFieldValue("category_id", value)}
                            />
                        </div>
                        <Button type="submit" label={isSubmitting ? "Creando post...":"Crear Post"}/>
                        <Button type="button" label="volver" onClick={() => navigate('/homeinside')} />
                    </Form>
                )}

            </Formik>
        </div>
    )}
export default NewPost