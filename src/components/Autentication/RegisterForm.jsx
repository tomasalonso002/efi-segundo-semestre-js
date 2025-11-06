import { useContext } from "react"

import { Formik, Form, Field,ErrorMessage } from "formik"
import * as Yup from'yup'
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import "../../style/RegisterForm.css"

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
                setTimeout(()=>navigate('/login'),1500)
            }else{
                toast.error("Hubo un error al registrar el usuario")
            }
        } catch(error){
            toast.error("Hubo un error en el servidor", error)
        }
    }
    
    return(
        
        <div>
            <Button className="register-button" type="button" label="volver" onClick={() => navigate('/')} />
            <Formik 
                initialValues={{ name: "", email: "", role: "user", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) =>(
                    <Form className="register-form">
                        <div className="container-register">
                            <h2>Crea una cuenta Klick </h2>
                            <div className="form-field">
                                <label>Nombre</label>
                                <Field as={InputText} id='name' name='name' placeholder='Tomas Alonso' />
                                <ErrorMessage name='name' component='small' className="error"/>
                            </div>
                            <div className="form-field">
                                <label>Email</label>
                                <Field as={InputText} id='email' name='email' placeholder='tomas@gmail.com' />
                                <ErrorMessage name='email' component='small' className="error"/>
                            </div>
                            <div className="form-field">
                                <label>Contraseña</label>
                                <Field as={InputText} id='password' name='password' type='password' placeholder='**********' />
                                <ErrorMessage name='password' component='small' className="error"/>
                            </div>
                            
                            <Button className="register-button" type="submit" label={isSubmitting ? "Registrando...": "Registrarse"}/>
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    )
}
export default RegisterForm