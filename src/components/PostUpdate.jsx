import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'

import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import React,{ useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

import SelectCategorias from "./SelectCategorias"

const validationSchema= Yup.object({
    title: Yup.string().required('El titulo es obligatorio'),
    content: Yup.string().required('El contenido es obligatorio'),
    category_id: Yup.number().required('La categoria es obligatoria')
})

const EditPost = ()=>{
    const navigate = useNavigate()
    const {token,user} = useContext(AuthContext)
    const handleSubmit = async (values, { resetForm }) => {
        try{
            const res = await fetch (`http://127.0.0.1:5000/post/${id}`, {
                method:'PUT',
                headers: {"Content-Type":"application/json", "Authorization": `Bearer ${token}`},
                body : JSON.stringify(values)
            })
            if (res.ok){
                toast.success("Posteo editado correctamente")
                resetForm()
                if(user.role === 'user'){
                    setTimeout(()=>navigate('/homeinside'),2000)
                }else{
                setTimeout(()=>navigate('/homeinsideadminmod'),2000)
                }
            }else{
                toast.error("HUbo un error")
            }
        }catch(error){
            toast.error("Hubo un error en el sevidor")
        }
    }
    return(
        <div >
             <Button className="post-form-button" type="button" label="volver" onClick={() => (user.role === 'user' ? navigate('/homeinside') : navigate('/homeinsideadminmod') )} />
            
            <Formik
                initialValues={{title:"", content: "", category_id:""}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting, values, setFieldValue})=>(
                    <Form >
                        
                        <div className="container-form">
                            <h2>Crear un posteo</h2>
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
                            <div className="post-form">
                                <SelectCategorias
                                className="select-categoria"
                                value={values.category_id}
                                onChange={(value)=>setFieldValue("category_id", value)}
                                />
                            </div>
                            <Button  className="post-form-button" type="submit" label={isSubmitting ? "Creando post...":"Crear Post"}/>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}
export default EditPost