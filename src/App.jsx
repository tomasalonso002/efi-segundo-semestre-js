import { Routes, Route } from "react-router-dom"

import HomeOutside from "./components/HomeOutside"
import HomeInside from "./components/HomeInside"
import RegisterForm from "./components/Autentication/RegisterForm"
import LoginForm from "./components/Autentication/LoginForm"
import NewPost from "./components/NewPost"
import MiPerfil from "./components/MiPerfil"
import PrivateRoute from "./components/ProteccionRutas"
import Posts from "./components/Posts"
function App() {

  return (
    <>
    <Routes>

      <Route path="/" element={<HomeOutside />} />
      <Route path="/registrarse" element={<RegisterForm />} />
      <Route path="/login"element={<LoginForm />}/>

      <Route path="/new_post" element={<PrivateRoute><NewPost /></PrivateRoute>} />
      <Route path="/homeinside" element={<PrivateRoute><HomeInside/></PrivateRoute>}/>
      <Route path="/miperfil" element={<PrivateRoute><MiPerfil/></PrivateRoute>}/>
      <Route path="/posteos" element={<PrivateRoute><Posts/></PrivateRoute>}/>
    
    </Routes>
    
    </>
  )
}

export default App
