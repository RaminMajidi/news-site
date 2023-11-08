import React, { useContext, useEffect, useState } from 'react'
import Layout from './Layout'
import Content from '../components/Detail/content/Content'
import SideLeft from '../components/Detail/sideLeft/SideLeft'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { errorHandler } from '../utils/toast'
import Loader from "@src/components/Loader/Loader"
import { HomeContext } from '../context/context'
const BASE_URL = import.meta.env.VITE_BASE_URL;


const Detail = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [detailData, setDetailData] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const {loadPopularNews} = useContext(HomeContext)

  const getDetailNews = async (id) => {
    try {
      setIsLoading(true)
      const res = await axios.get(`${BASE_URL}/api/News/detail/${id}`)
      if (res.status === 200) {
        const data = await res.data.news
        setDetailData(data)
        loadPopularNews()
      }
    } catch (error) {
      if (error.response.status === 404) {
        navigate("/404")
      } else {
        errorHandler(error)
      }

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      getDetailNews(id)
    }
  }, [])

  return (
    <Layout>
      {isLoading &&
        <Loader />

      }
      {detailData &&
        <section className='detail-post mt5'>
          <div className="container">
            <div className="columns">
              <div className="column is-two-thirds">
                <Content data={detailData} />
              </div>
              <div className="column is-one-third">
                <SideLeft />
              </div>
            </div>
          </div>
        </section>
      }
    </Layout>
  )
}

export default Detail