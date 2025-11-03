import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import PrivateRoute from "./components/ProteccionRuntas"
function App() {

  return (
    <>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/registrarse" element={<RegisterForm />} />
      <Route path="/login"element={<LoginForm />}/>

      <Route path="/post" element={<PrivateRoute><NewPost /></PrivateRoute>} /></Routes>
    
    
    
    </>
  )
}

export default App
