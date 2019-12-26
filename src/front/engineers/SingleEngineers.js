import React, { Component } from 'react';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import { Container } from 'react-bootstrap';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './SingleEngineers.css';
import jwt from 'jwt-decode';
import { connect } from 'react-redux';
import Loader from '../../partials/Loader';
import { fetchSingleData } from '../../public/redux/actions/engineers';

class SingleEngineers extends Component {
  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };
  wait = async (milliseconds = 400) => {
    await this.sleep(milliseconds);
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
      if (user.role !== 'company') {
        history.push('/engineers');
      }
    }
    this.props.fetch(this.props.match.params.id);
  }
  render() {
    const helmetContext = {};
    const { engineers, isLoading, isLoadingFirst } = this.props;

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
          <title>Engineer</title>
        </Helmet>
        <Header />

        {isLoading && (
          <div className='d-flex justify-content-center loading'>
            <Loader />
          </div>
        )}
        <Container fluid>
          <div fluid='true'>
            {engineers ? (
              <div className='offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center'>
                <div className='row'>
                  <div className='col-lg-12 col-sm-12 col-12 profile-header'></div>
                </div>
                <div className='row user-detail'>
                  <div className='col-lg-12 col-sm-12 col-12'>
                    <div
                      className='rounded-circle profile'
                      style={{
                        backgroundImage: `url(${process.env.REACT_APP_BASE_URL}engineers/${engineers.photo})`,
                      }}
                    ></div>
                    <h1>{engineers.name}</h1>
                    <p>Location: {engineers.location}</p>
                    <p>Specialist: {engineers.specialist}</p>
                    <p>Skills: {engineers.skills}</p>
                    <p>
                      Date of Birth:{' '}
                      {new Intl.DateTimeFormat('en-GB', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                      }).format(new Date(engineers.date_of_birth))}
                    </p>
                    <p>Description: {engineers.description}</p>
                    <p>
                      Expected Salary: Rp.{' '}
                      {engineers.expected_salary
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                    </p>
                    <hr />
                    <span>Showcases</span>
                    {engineers.showcases.map((showcase, index) => (
                      <p key={index}>
                        <a href={showcase.link}>{showcase.name}</a>
                      </p>
                    ))}
                  </div>
                </div>
                <div className='row user-social-detail'>
                  <div className='col-lg-12 col-sm-12 col-12'>
                    <Link to='#/' className='contact'>
                      <i className='fa fa-phone' aria-hidden='true'></i>
                      {engineers.no_contact}
                    </Link>
                    <Link to='#/' className='contact'>
                      <i className='fa fa-envelope' aria-hidden='true'></i>
                      {engineers.email}
                    </Link>
                    <Link to='#/' className='btn btn-warning btn-sm'>
                      Send Messege
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <h1 className='text-center'>Engineer Not Found!</h1>
            )}
          </div>
        </Container>
        <Footer />
      </HelmetProvider>
    );
  }
}
const mapStateToProps = state => ({
  engineers: state.singleEngineers.items[0],
  isLoading: state.singleEngineers.isLoading,
  isLoadingFirst: state.singleEngineers.isLoadingFirst,
});

const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(fetchSingleData(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleEngineers);
