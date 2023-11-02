import { ToastContainer } from 'react-toastify';
import Login from "./admin/auth/Login"
import { Routes, Route } from "react-router-dom"
import ViewNews from './admin/dashbord/components/news/ViewNews';
import Main from './admin/dashbord/components/main/Main';
import AddNews from './admin/dashbord/components/news/add/AddNews';
import EditNews from './admin/dashbord/components/news/edit/EditNews';
import NotFound from './pages/NotFound';
import ViewCategory from './admin/dashbord/components/category/ViewCategory';
import AddOrEdit from './admin/dashbord/components/category/AddOrEdit';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/administrator" element={<Login />} />

        <Route path="/main" element={<Main />} />

        <Route path="/view-news" element={<ViewNews />} />
        <Route path="/add-news" element={<AddNews />} />
        <Route path="/edit-news/:id" element={<EditNews />} />

        <Route path="/view-category" element={<ViewCategory />} />
        <Route path="/add-category" element={<AddOrEdit />} />
        <Route path="/edit-category/:id" element={<AddOrEdit />} />


        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
