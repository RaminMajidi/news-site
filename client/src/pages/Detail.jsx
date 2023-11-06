import React from 'react'
import Layout from './Layout'
import Content from '../components/Detail/content/Content'
import SideLeft from '../components/Detail/sideLeft/SideLeft'

const Detail = () => {
  return (
    <Layout>
      <section className='detail-post mt5'>
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds">
              <Content />
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