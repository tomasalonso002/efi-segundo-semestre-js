import { jwtDecode } from "jwt-decode";

const InfoToken =()=>{
    const token = localStorage.getItem("token")
    if (!token) return null
    try {
        const decoded = jwtDecode(token)
         return{
             id: decoded.id,
             name: decoded.name,
             email: decoded.email,
             role: decoded.role,
            }

    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
        
    }
}
export default InfoToken
