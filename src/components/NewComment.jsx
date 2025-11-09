import { Formik, Form, Field,ErrorMessage } from "formik"
import * as Yup from'yup'

import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { toast } from "react-toastify"

import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import PostComments from "./PostComments"

const validationSchema = Yup.object({
    text_comment : Yup.string().required('No puede estar vacio')
})

const NewComment = ({id}) => {
    const {token} = useContext(AuthContext)

    const handleSubmit = async(values, { resetForm })=>{
        
        try {
            const res =  await fetch(`http://127.0.0.1:5000/post/${id}/comment`,{
                method: "POST",
                headers : {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body : JSON.stringify(values)
            })
            if(res.ok){
                toast.success("Comentario creado correctamente")
                resetForm()
                PostComments()
            }else{
                toast.error("Hubo un error")
                resetForm()
            }
        } catch (error) {
            toast.error("Hubo un error en el servidor")
        }
    }

    return(
        <div>
            <Formik
                initialValues={{text_comment:""}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting, values, setFieldValue})=>(
                    <Form>
                        <div>
                            <Field as={InputText} id="text_comment" name="text_comment"/>
                            <ErrorMessage name="text_comment" component="small" className="error"/>
                        </div>
                        <div>
                            <Button  className="post-form-button" type="submit" label={isSubmitting ? "Comentando...":"Comentar"}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default NewComment