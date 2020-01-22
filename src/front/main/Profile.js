import React, { Component } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import jwt from 'jwt-decode';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import Loader from '../../partials/Loader';
import '../engineers/SingleEngineers';
import ProfileCompany from './ProfileCompany';
import ProfileEngineer from './ProfileEngineer';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      username: '',
      photo: '',
      role: '',
      user_id: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.wait(400);
    const {history} = this.props;
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    } else {
      const user = jwt(token);
      // call API search for name
      axios
        .get(`${process.env.REACT_APP_API_URL}/${user.role}/${user.id}`)
        .then(res => {
          const data = user.role === 'engineer' ? res.data.engineersData[0] : res.data.data[0];
          const photo =
            user.role === 'engineer' ? res.data.engineersData[0].photo : res.data.data[0].logo;
          this.setState({
            items: data,
            photo,
            username: user.username,
            role: user.role,
            user_id: user.id,
            isLoading: false,
          });
        })
        .catch(err => {
          this.setState({ isLoading: false });
        });
    }
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

  render() {
    const helmetContext = {};
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center loading" style={{ marginTop: 350 }}>
          <Loader />
        </div>
      );
    }
    return (
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <Header />
        <Container fluid>
          <div fluid='true'>
            {this.state ? (
              this.state.role === 'company' ? (
                /*company*/
                <div className='offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center'>
                  <div className='row'>
                    <div className='col-lg-12 col-sm-12 col-12 profile-header'></div>
                  </div>
                  <div className='row user-detail'>
                    <div className='col-lg-12 col-sm-12 col-12'>
                      <div
                        className='rounded-circle profile'
                        style={{
                          backgroundImage: `url(${process.env.REACT_APP_BASE_URL}companies/${this.state.photo})`,
                        }}
                      ></div>
                      <h1>{this.state.items.name}</h1>
                      <p>Location: {this.state.items.location}</p>
                      <p>Description: {this.state.items.description}</p>
                      <hr />
                    </div>
                  </div>
                  <div className='row user-social-detail'>
                    <div className='col-lg-12 col-sm-12 col-12'>
                      <Link to='' className='contact'>
                        <i className='fa fa-phone' aria-hidden='true'></i>
                        {this.state.items.no_contact}
                      </Link>
                      <Link to='' className='contact'>
                        <i className='fa fa-envelope' aria-hidden='true'></i>
                        {this.state.items.email}
                      </Link>
                      <button
                        type='button'
                        className='btn btn-warning btn-sm'
                        data-toggle='modal'
                        data-target='#companyModal'
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // engineer
                <div className='offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center'>
                  <div className='row'>
                    <div className='col-lg-12 col-sm-12 col-12 profile-header'></div>
                  </div>
                  <div className='row user-detail'>
                    <div className='col-lg-12 col-sm-12 col-12'>
                      <div
                        className='rounded-circle profile'
                        style={{
                          backgroundImage: `url(${process.env.REACT_APP_BASE_URL}engineers/${this.state.items.photo})`,
                        }}
                      ></div>
                      <h1>{this.state.items.name}</h1>
                      <p>Location: {this.state.items.location}</p>
                      <p>Specialist: {this.state.items.specialist}</p>
                      <p>Skills: {this.state.items.skills}</p>
                      <p>
                        Date Of Birth:{' '}
                        {this.state.items.date_of_birth
                          ? new Intl.DateTimeFormat('en-GB', {
                              month: 'long',
                              day: '2-digit',
                              year: 'numeric',
                            }).format(new Date(this.state.items.date_of_birth))
                          : ''}
                      </p>
                      <p>Description: {this.state.items.description}</p>
                      <p>
                        Expected Salary: Rp.{' '}
                        {this.state.items.expected_salary
                          ? this.state.items.expected_salary
                              .toString()
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                          : 0}
                      </p>
                      <hr />
                      <span>Showcases</span>
                      <br/>
                      {this.state.items.showcases
                        ? this.state.items.showcases.map((showcase, index) => (
                            <span key={index} className="showcaseSpan">
                              <a href={showcase.link}>{showcase.name}</a>
                            </span>
                          ))
                        : ''}
                    </div>
                  </div>
                  {/* // company */}
                  <div className='row user-social-detail'>
                    <div className='col-lg-12 col-sm-12 col-12'>
                      <Link to='' className='contact'>
                        <i className='fa fa-phone' aria-hidden='true'></i>
                        {this.state.items.no_contact}
                      </Link>
                      <Link to='' className='contact'>
                        <i className='fa fa-envelope' aria-hidden='true'></i>
                        {this.state.items.email}
                      </Link>
                      <button
                        type='button'
                        className='btn btn-warning btn-sm'
                        data-toggle='modal'
                        data-target='#engineerModal'
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <h1 className='text-center'>User Not Found!</h1>
            )}
          </div>
          {this.state.role === 'engineer' ? (
            // engineer
            <ProfileEngineer
              location={this.state.items.location}
              description={this.state.items.description}
              username={this.state.username}
              name={this.state.items.name}
              specialist={this.state.items.specialist}
              skills={this.state.items.skills}
              email={this.state.items.email}
              expected_salary={this.state.items.expected_salary}
              no_contact={this.state.items.no_contact}
              photo={this.state.items.photo}
              date_of_birth={this.state.items.date_of_birth.split('T')}
            />
          ) : this.state.role === 'company' ? (
            /*company*/
            <ProfileCompany
              user_id={this.state.user_id}
              location={this.state.items.location}
              id={this.state.items.id}
              description={this.state.items.description}
              username={this.state.username}
              name={this.state.items.name}
              email={this.state.items.email}
              no_contact={this.state.items.no_contact}
              photo={this.state.items.logo}
            />
          ) : (
            ''
          )}
        </Container>
        <Footer />
      </HelmetProvider>
    );
  }
}

export default Profile;
