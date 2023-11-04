import './Main.css'
import Dashbord from '../../Dashbord'
import { useContext } from 'react'
import { AdminContext } from '../../../context/context'
const Main = () => {
    const { userData } = useContext(AdminContext)
    return (
        <Dashbord title="داشبورد">
            <h1 className='is-size-3'>سلام <span className='has-text-success'>{userData?.name}</span> ، به پنل مدیریت خوش آمدید</h1>
            <h3 className='is-size-5 mt-3'>امیدوارم خبرهای خوبی داشته باشی</h3>
        </Dashbord>
    )
}

export default Main