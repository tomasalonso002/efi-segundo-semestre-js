import { useContext } from "react"

import { Formik, Form, Field,ErrorMessage } from "formik"
import * as Yup from'yup'
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"

const validationSchema = Yup.object({
    name: Yup.string().required('El nombr es obligatorio'),
    email: Yup.string().email('Email invalido').required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
})                                                                                                                                               


const RegisterForm =()=>{


    const navigate = useNavigate()

    const handleSubmit = async (values, { resetForm }) =>{
        try{
            const response = await fetch ('http://127.0.0.1:5000/register', {
                method:'POST',
                headers: {"Content-Type":"application/json"},
                body : JSON.stringify(values)
            })
            if (response.ok){
                toast.success("Usuario registrado con exito")
                resetForm()
                setTimeout(()=>navigate('/'),2000)
            }else{
                toast.error("Hubo un error al registrar el usuario")
            }
        } catch(error){
            toast.error("Hubo un error en el servidor", error)
        }
    }
    
    return(
        
        <div className="register-container">
            <h2>Crea una cuenta</h2>
            <Formik 
                initialValues={{ name: "", email: "", role: "user", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) =>(
                    <Form className="register-form">
                        <div className="form-field">
                            <label>Nombre</label>
                            <Field as={InputText} id='name' name='name' />
                            <ErrorMessage name='name' component='small' className="error"/>
                        </div>
                        <div className="form-field">
                            <label>Email</label>
                            <Field as={InputText} id='email' name='email' />
                            <ErrorMessage name='email' component='small' className="error"/>
                        </div>
                        <div className="form-field">
                            <label>Contraseña</label>
                            <Field as={InputText} id='password' name='password' />
                            <ErrorMessage name='password' component='small' className="error"/>
                        </div>
                        <Button type="submit" label={isSubmitting ? "Registrando...": "Registrarse"}/>
                        <Button type="button" label="volver" onClick={() => navigate('/')} />
                    </Form>
                )}
            </Formik>

        </div>
    )
}
export default RegisterForm