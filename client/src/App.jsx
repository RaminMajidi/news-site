import { ToastContainer } from 'react-toastify';
import Login from "./admin/auth/Login"
import { Routes, Route } from "react-router-dom"
import ViewNews from './admin/dashbord/components/news/ViewNews';
import Main from './admin/dashbord/components/main/Main';
import NotFound from './pages/NotFound';
import ViewCategories from './admin/dashbord/components/category/ViewCategories';
import AddOrEditCategory from './admin/dashbord/components/category/AddOrEditCategory';
import AddOrEditNews from './admin/dashbord/components/news/AddOrEditNews';
import ViewVideo from './admin/dashbord/components/videos/ViewVideo';
import AddVideo from './admin/dashbord/components/videos/AddVideo';
import ViewUsers from './admin/dashbord/components/users/ViewUsers';
import AddOrEditUser from './admin/dashbord/components/users/AddOrEditUser';
import ProfileUpdate from './admin/dashbord/components/users/profile/ProfileUpdate';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/administrator" element={<Login />} />

        <Route path="/main" element={<Main />} />

        <Route path="/view-news" element={<ViewNews />} />
        <Route path="/add-news" element={<AddOrEditNews />} />
        <Route path="/edit-news/:id" element={<AddOrEditNews />} />

        <Route path="/view-category" element={<ViewCategories />} />
        <Route path="/add-category" element={<AddOrEditCategory />} />
        <Route path="/edit-category/:id" element={<AddOrEditCategory />} />

        <Route path='/view-video' element={<ViewVideo />} />
        <Route path='/add-video' element={<AddVideo />} />

        <Route path='/view-users' element={<ViewUsers />} />
        <Route path='/add-user' element={<AddOrEditUser />} />
        <Route path='/edit-user/:id' element={<AddOrEditUser />} />
        <Route path='/edit-profile/:id' element={<ProfileUpdate />} />


        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
