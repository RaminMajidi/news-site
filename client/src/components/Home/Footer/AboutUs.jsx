import logo from '@src/assets/images/logo.png'

const AboutUs = () => {
    return (
        <div className="column is-one-third">
            <div className="footer-logo">
                <img className="img-logo" src={logo} alt="" />
            </div>
            <div className="footer-address is-flex is-align-items-center mt-4">
                <box-icon name='info-circle' color='#008fff' size="md"></box-icon>
                <p className="mr-2">
                    ما یه سایت خبری هستیم که اخبار جعلی اما بروز دنیا رو پخش میکنیم
                </p>
            </div>
            <div className="footer-address is-flex is-align-items-center mt-4">
                <box-icon name='map-pin' color='#008fff' size="sm"></box-icon>
                <p className="mr-2">
                    ایران اصفهان مستقیم دست راست طبقه بالا واحد پایین
                </p>
            </div>

            <div className="footer-address is-flex is-align-items-center mt-4">
                <box-icon name='phone' color='#008fff' size="sm"></box-icon>
                <p className="mr-2">
                    تلفن : 09130004321
                </p>
            </div>
        </div>
    )
}

export default AboutUs