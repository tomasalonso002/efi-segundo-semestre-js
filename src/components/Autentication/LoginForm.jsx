import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useState, useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
const validationSchema = Yup.object({
    email: Yup.string().email('Email invalido').required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
})

const LoginForm=()=>{
    const {login} = useContext(AuthContext)
        
    const navigate = useNavigate()
    const handleSubmit = async (values, { resetForm }) =>{
        try {
            login(values.email, values.password)
            resetForm()
        } catch (error) {
            toast.error("Hubo un error en el servidor", error)
            return false
        }
    }
    return(
        <div className="register-container">
            <h2>Inicia Sesion</h2>
            <Formik
                initialValues={{ email : "", password: ""}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form className="register-form">
                       <div className="form-field">
                            <label>Email</label>
                            <Field as={InputText} id='email' name='email' placeholder='tomas@gmail.com'/>
                            <ErrorMessage name='email' component='small' className="error"/>
                       </div>
                       <div className="form-field">
                            <label>Contraseña</label>
                            <Field as={InputText} id='password' name='password' type='password' placeholder='*********'/>
                            <ErrorMessage name='password' component='small' className="error"/>
                       </div>
                       <Button type="submit" label={isSubmitting ? "Iniciando....": "Iniciar Sesion"} />
                        <Button type="button" label="volver" onClick={() => navigate('/')} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default LoginForm