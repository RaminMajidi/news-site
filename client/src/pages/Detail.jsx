import React, { useEffect } from 'react'
import Layout from './Layout'
import Content from '../components/Detail/content/Content'
import SideLeft from '../components/Detail/sideLeft/SideLeft'
import { useLocation, useNavigate } from 'react-router-dom'

const Detail = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!state) {
      console.log("testttsts");
      return navigate('/404')
    }
  }, [state])

  return (
    <Layout>
      <section className='detail-post mt5'>
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds">
              <Content data={state} />
            </div>
            <div className="column is-one-third">
              <SideLeft />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Detail