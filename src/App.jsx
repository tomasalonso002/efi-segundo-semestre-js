import { Routes, Route } from "react-router-dom"

import HomeOutside from "./components/HomeOutside"
import HomeInside from "./components/HomeInside"
import RegisterForm from "./components/Autentication/RegisterForm"
import LoginForm from "./components/Autentication/LoginForm"
import NewPost from "./components/NewPost"

import PrivateRoute from "./components/ProteccionRutas"

function App() {

  return (
    <>
    <Routes>

      <Route path="/homeoutside" element={<HomeOutside />} />
      <Route path="/registrarse" element={<RegisterForm />} />
      <Route path="/login"element={<LoginForm />}/>

      <Route path="/post" element={<PrivateRoute><NewPost /></PrivateRoute>} />
      <Route path="/homeinside" element={<PrivateRoute><HomeInside/></PrivateRoute>}/>
    
    </Routes>
    
    </>
  )
}

export default App
