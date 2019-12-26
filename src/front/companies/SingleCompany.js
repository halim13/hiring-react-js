import React, { Component } from 'react';
import axios from 'axios';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import { Container } from 'react-bootstrap';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import '../engineers/SingleEngineers.css';
import jwt from 'jwt-decode';
import { connect } from 'react-redux';
import Loader from '../../partials/Loader';
import { fetchSingleData } from '../../public/redux/actions/companies';

class SingleCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      showcases: [],
      isLoading: false,
    };
  }
  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };
  wait = async (milliseconds = 400) => {
    await this.sleep(milliseconds);
    this.setState({
      isLoading: false,
    });
  };
  componentDidMount() {
    this.wait(400);
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    }
    if (token) {
      const user = jwt(token);
      if (user.role !== 'engineer') {
        history.push('/companies');
      }
    }

    this.props.fetch(this.props.match.params.id);
    // call API search for name
    // axios
    //   .get(
    //     `${process.env.REACT_APP_API_URL}company/${this.props.match.params.id}`
    //   )
    //   .then(res => {
    //     // console.log(res.data)
    //     this.setState({
    //       items: res.data.data,
    //       isLoading: false
    //     })
    //     // console.log(this.state.series)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     this.setState({ isLoading: false })
    //   })
  }
  render() {
    const helmetContext = {};
    const { company, isLoading, isLoadingFirst } = this.props;

    if (isLoadingFirst) {
      return (
        <div
          className='d-flex justify-content-center loading'
          style={{ marginTop: 350 }}
        >
          <Loader />
        </div>
      );
    }

    return (
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>Company</title>
        </Helmet>
        <Header />

        {isLoading && (
          <div className='d-flex justify-content-center loading'>
            <Loader />
          </div>
        )}
        <Container fluid>
          <div fluid='true'>
            {company ? (
              <div className='offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center'>
                <div className='row'>
                  <div className='col-lg-12 col-sm-12 col-12 profile-header'></div>
                </div>
                <div className='row user-detail'>
                  <div className='col-lg-12 col-sm-12 col-12'>
                    <div
                      className='rounded-circle profile'
                      style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL}companies/${company[0].logo})` }}
                    ></div>
                    <h1>{company[0].name}</h1>
                    <p>Location: {company[0].location}</p>
                    <p>Description: {company[0].description}</p>
                    <hr />
                  </div>
                </div>
                <div className='row user-social-detail'>
                  <div className='col-lg-12 col-sm-12 col-12'>
                    <Link to='#/' className='contact'>
                      <i className='fa fa-phone' aria-hidden='true'></i>
                      {company[0].no_contact}
                    </Link>
                    <Link to='#/' className='contact'>
                      <i className='fa fa-envelope' aria-hidden='true'></i>
                      {company[0].email}
                    </Link>
                    <Link to='#/' className='btn btn-warning btn-sm'>
                      Send Messege
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              // <h1 className='text-center'>Company Not Found!</h1>
              ''
            )}
          </div>
        </Container>
        <Footer />
      </HelmetProvider>
    );
  }
}

const mapStateToProps = state => ({
  company: state.singleCompany.items,
  isLoading: state.singleCompany.isLoading,
  isLoadingFirst: state.singleCompany.isLoadingFirst,
});

const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(fetchSingleData(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCompany);
