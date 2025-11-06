import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const useLogout = () => {
    const navigate = useNavigate()

    const logout = ()=> {
        localStorage.removeItem("token")
        toast.info("Sesion Cerrada")
        setTimeout(()=>navigate('/'),2000)
    }
    return logout
}
export default useLogout 