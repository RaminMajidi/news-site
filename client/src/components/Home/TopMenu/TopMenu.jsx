import Logo from '@src/assets/images/logo.png'
import ads from '@src/assets/images/ads.jpg'
import banner from '@src/assets/images/banner.jpg'
import "./TopMenu.css"

const TopMenu = () => {
    return (
        <>

            <div className='top-menu has-background-black py-4 has-text-light'>
                <div className="container">
                    <div className="columns ">
                        <div className='column is-two-thirds is-flex is-justify-content-start'>
                            <span className='is-flex is-justify-content-center is-align-items-center'>
                                <box-icon name='envelope' color='red' size="sm" ></box-icon>
                                <span className='mx-2'>برقراری ارتباط : example@gmail.com</span>
                            </span>
                        </div>
                        <div className="column is-one-third is-flex is-justify-content-end">
                            <span className='is-flex is-justify-content-center is-align-items-center '>
                                <box-icon name='phone' color='green' size="sm"></box-icon>
                                <span className='mx-2'>09917572781</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-page-logo  pt-3">
                <div className="container">
                    <div className="columns">
                        <div className="column is-two-thirds ads mx-1">
                            <img src={banner} alt="ads-img" />
                        </div>

                        <div className="column is-one-third logo mx-1 is-flex is-justify-content-end ">
                            <img className='img-logo' src={Logo} alt="logo-img" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopMenu