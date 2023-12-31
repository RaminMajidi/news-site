import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from "@src/components/Loader/Loader"
import { errorHandler } from '@src/utils/toast'
import axios from 'axios'
import CommentBox from './CommentBox'
import NotComment from './NotComment'

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ViewComment = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)


    // start ******
    const getNewsComment = async (newsId) => {
        try {
            setLoading(true)
            const res = await axios.get(`${BASE_URL}/api/comment/${newsId}`)
            if (res.status === 200) {
                const data = await res.data.comments
                setData(data)
            }
        } catch (error) {
            errorHandler(error, 4000)
        } finally {
            setLoading(false)
        }
    }
    // end ******

    useEffect(() => {
        getNewsComment(id)
    }, [])

    return (
        <>
            {loading &&
                <div className='comment-view my-5 py-3 has-background-white'>
                    <Loader />
                </div>
            }
            {(!loading && data?.length > 0) &&
                <div className='comment-view my-5'>
                    {
                        data.map(item => (
                            <CommentBox key={item.id} comment={item} />
                        ))
                    }
                </div>
            }

            {(!loading && data?.length == 0) &&
                <NotComment />
            }
        </>
    )
}

export default ViewComment