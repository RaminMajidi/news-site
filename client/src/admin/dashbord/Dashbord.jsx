import React, { useContext } from 'react'
import { AdminContext } from '../context/context'
import Sidbar from './components/sidbar/Sidbar'
import Information from './components/information/Information'
import "./Index.css"

const Dashbord = () => {
    const { getAllUser } = useContext(AdminContext)
    return (
        <div className='dashbord-wrapper'>
            <Sidbar />
            <div className="main-info has-background-grey">
                <Information />
                <div className="main has-text-light">
                    <h1 className='is-size-3'>سلام ، به پنل مدیریت خوش آمدید</h1>
                    <h3 className='is-size-5 mt-3'>امیدوارم خبرهای خوبی داشته باشی</h3>
                </div>
            </div>
        </div>
    )
}

export default Dashbord