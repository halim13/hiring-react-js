import React, { Component } from 'react'
import Header from '../../partials/Header'
import Footer from '../../partials/Footer'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Loader from '../../partials/Loader'

class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }
  componentDidMount () {
    this.props.history.push('/login')
  }
  render () {
    const helmetContext = {}
    if (this.state.isLoading) {
      return (
        <div
          className='d-flex justify-content-center loading'
          style={{ marginTop: 350 }}
        >
          <Loader />
        </div>
      )
    }
    return (
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Header />
        Main
        <Footer />
      </HelmetProvider>
    )
  }
}

export default Main
