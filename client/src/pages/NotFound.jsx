import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <section
            className='is-full-widescreen is-flex is-justify-content-center
             is-align-items-center has-background-black-ter h_100dvh'>
            <div className='has-text-light is-flex is-flex-direction-column '>
                <h2 className='is-size-3 text_center'>خطای 404</h2>
                <h5 className='is-size-4 text_center my-4'>صفحه مورد نظر یافت نشد</h5>
                <Link className='button is-info ' to={'/'}>بازگشت به خانه</Link>
            </div>
        </section>
    )
}

export default NotFound