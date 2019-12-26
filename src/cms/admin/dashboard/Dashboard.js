import React from 'react'
import Head from '../Head'
import Content from './Content'
import Sidebar from '../Sidebar'
import Footer from '../Footer'

function Dashboard () {
  return (
    <div>
      <Head />
      <Sidebar />
      <Content />
      <Footer />
    </div>
  )
}

export default Dashboard
