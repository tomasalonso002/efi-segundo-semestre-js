import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useState } from "react"
const validationSchema = Yup.object({
    email: Yup.string().email('Email invalido').required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
})

const LoginForm=()=>{

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    
    const navigate = useNavigate()
    const handleSubmit = async (values, { resetForm }) =>{
        try {
            const response = await fetch ('http://127.0.0.1:5000/login',{
                method:'POST',
                headers: {"Content-Type":"application/json"},
                body : JSON.stringify(values)
            })

            if(!response.ok){
                return toast.error("Hubo un error al iniciar sesion")
            }

            const data = await response.json()
            const jwtToken = data.access_token
            if (!jwtToken){
                return toast.error('No se recibio Token')
            }
        
            localStorage.setItem('token', jwtToken)
            const decoded = jwtDecode(jwtToken)
            setUser(decoded)
            setToken(jwtToken)
            toast.success('Inicio de sesion exitoso')
            resetForm()
            setTimeout(()=>navigate('/'),2000)
            return true
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
                            <Field as={InputText} id='email' name='email'/>
                            <ErrorMessage name='email' component='small' className="error"/>
                       </div>
                       <div className="form-field">
                            <label>Contraseña</label>
                            <Field as={InputText} id='password' name='password' type='password'/>
                            <ErrorMessage name='password' component='small' className="error"/>
                       </div>
                       <Button type="submit" label={isSubmitting ? "Iniciando....": "Iniciar Sesion"} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default LoginForm