import React from 'react'
import Dashbord from '../../Dashbord'

const AddNews = () => {
    return (
        <Dashbord>
            <form className='container'>
                <div className="field">
                    <label className='label has-text-light'>عنوان خبر</label>
                    <div className="control ">
                        <input
                            name='title'
                            className='input has-background-grey-lighter'
                            type="text"
                            placeholder='مثال * خبر جدید'
                        />
                    </div>
                </div>

                <div className="field">
                    <label className='label has-text-light'>متن خبر</label>
                    <div className="control">
                        <textarea
                            className='textarea has-background-grey-lighter'
                            placeholder='مثال * توضیح خبر جدید'></textarea>
                    </div>
                </div>

                <div className="field">
                    <label className='label has-text-light'>دسته بندی خبر</label>
                    <div className="control">
                        <div className="select is-fullwidth ">
                            <select className='has-background-grey-lighter'>
                                <option >تست</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className='label has-text-light'> عکس خبر</label>
                    <div className="control ">
                        <input
                            type="file"
                            className='input has-background-grey-lighter' />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button
                            type='submit'
                            className='button is-success px-6 mt-6'
                        >ثبت</button>
                    </div>
                </div>


            </form>
        </Dashbord>
    )
}

export default AddNews