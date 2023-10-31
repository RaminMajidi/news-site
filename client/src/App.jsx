import { ToastContainer } from 'react-toastify';
import Login from "./admin/auth/Login"
import { Routes, Route } from "react-router-dom"
import ViewNews from './admin/dashbord/components/news/ViewNews';
import Main from './admin/dashbord/components/main/Main';
import AddNews from './admin/dashbord/components/news/AddNews';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/administrator" element={<Login/>} />
        <Route path="/main" element={<Main/>} />
        <Route path="/view-news" element={<ViewNews/>} />
        <Route path="/add-news" element={<AddNews/>} />
      </Routes>
    </>
  )
}

export default App
