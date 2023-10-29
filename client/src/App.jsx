import { ToastContainer } from 'react-toastify';
import Login from "./admin/auth/Login"
import { Routes, Route } from "react-router-dom"
import Dashbord from "./admin/dashbord/Dashbord"



function App() {


  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/administrator" element={<Login />} />
        <Route path="/dashbord" element={<Dashbord />} />
      </Routes>
    </>
  )
}

export default App
