import React from 'react'
import { convertDateToJalali } from '../../../utils/convertDate'

const CommentBox = ({ comment }) => {
    return (
        <div className="box">
            <div className="name is-size-5">
                {comment?.name}
            </div>
            <div className="subject has-text-grey">
                <div className="pr-2 mt-2 is-flex is-align-items-center">
                    <box-icon name='subdirectory-left'></box-icon>
                    <span className='pr-2  is-size-6'>
                        {comment?.subject}
                    </span>
                    <span className='pr-6 is-size-6'>
                        {convertDateToJalali(comment?.createdAt)}
                    </span>
                </div>
            </div>
            <div className="desc pt-4 ">
                <p className='has-text-justified'>
                    {comment?.description}
                </p>
            </div>
        </div>
    )
}

export default CommentBox