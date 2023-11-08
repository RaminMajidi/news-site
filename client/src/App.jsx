import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router-dom"
import Login from "@src/admin/auth/Login"
import ViewNews from '@src/admin/dashbord/components/news/ViewNews';
import Main from '@src/admin/dashbord/components/main/Main';
import ViewCategories from '@src/admin/dashbord/components/category/ViewCategories';
import AddOrEditCategory from '@src/admin/dashbord/components/category/AddOrEditCategory';
import AddOrEditNews from '@src/admin/dashbord/components/news/AddOrEditNews';
import ViewVideo from '@src/admin/dashbord/components/videos/ViewVideo';
import AddVideo from '@src/admin/dashbord/components/videos/AddVideo';
import ViewUsers from '@src/admin/dashbord/components/users/ViewUsers';
import AddOrEditUser from '@src/admin/dashbord/components/users/AddOrEditUser';
import ProfileUpdate from '@src/admin/dashbord/components/users/profile/ProfileUpdate';
import NotFound from '@src/pages/NotFound';
import Home from '@src/pages/Home';
import About from '@src/pages/About';
import Contact from '@src/pages/Contact';
import Detail from '@src/pages/Detail';
import ViewComments from './admin/dashbord/components/comment/ViewComments';


const App = () => {
    // console.error = () => { }
    // console.log = () => { }
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/detail/:id' element={<Detail />} />


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


                <Route path='/view-comments' element={<ViewComments />} />

                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App