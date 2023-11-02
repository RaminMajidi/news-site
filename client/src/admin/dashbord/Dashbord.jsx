import Sidbar from './components/sidbar/Sidbar'
import Information from './components/information/Information'
import "./Index.css"

const Dashbord = ({ title, children }) => {
    return (
        <div className='dashbord-wrapper'>
            <Sidbar />
            <div className="main-info has-background-grey">
                <Information />
                <div className="main has-text-light my_container px-3">
                    <h2 className='text_center py-4 is-size-4'>
                        {title}
                        <hr
                            style={{ width: "50%", margin: ".5rem auto" }}
                        />
                    </h2>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Dashbord