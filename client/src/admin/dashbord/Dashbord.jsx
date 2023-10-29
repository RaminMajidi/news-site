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
            <div className="main-info">
                <Information />
                <div className="main">
                    <h4>به پنل ادمین خوش آمدید</h4>
                </div>
            </div>
        </div>
    )
}

export default Dashbord