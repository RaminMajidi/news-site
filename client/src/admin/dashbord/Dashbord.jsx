import Sidbar from './components/sidbar/Sidbar'
import Information from './components/information/Information'
import "./Index.css"

const Dashbord = ({ children }) => {
    return (
        <div className='dashbord-wrapper'>
            <Sidbar />
            <div className="main-info has-background-grey">
                <Information />
                <div className="main has-text-light my_container">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Dashbord