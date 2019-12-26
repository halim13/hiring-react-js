import React, { Component } from 'react';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import './LoginRegister.css';
import Loader from '../../partials/Loader';
import jwt from 'jwt-decode';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      role: '',
      isLoading: true,
    };
  }
  onChangeUserName(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    // console.log(this.state)
    const { history } = this.props;
    const obj = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}register`, obj)
      .then(res => {
        Swal.fire({
          title: 'Success!',
          text: 'Register Success',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
        });
        history.push('/login');
      })
      .catch(error =>
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          showConfirmButton: false,
        })
      );
    this.setState({
      username: '',
      password: '',
      role: '',
    });
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
    if (token) {
      const user = jwt(token);
      if (user.role === 'engineer') {
        history.push('/companies');
      } else if (user.role === 'company') {
        history.push('/engineers');
      }
    }
  }
  render() {
    const helmetContext = {};
    if (this.state.isLoading) {
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
          <title>Register</title>
        </Helmet>
        <Header />
        <section className='signup'>
          <div className='container'>
            <div className='signup-content'>
              <div className='signup-form'>
                <h2 className='form-title'>Register</h2>
                <form
                  onSubmit={this.onSubmit}
                  className='register-form'
                  id='register-form'
                >
                  <div className='form-group'>
                    <label htmlFor='username'>
                      <i className='zmdi zmdi-account material-icons-name'></i>
                    </label>
                    <input
                      type='text'
                      name='username'
                      id='name'
                      placeholder='Username'
                      value={this.state.username}
                      onChange={this.onChangeUserName}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'>
                      <i className='zmdi zmdi-lock'></i>
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='pass'
                      placeholder='Password'
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      required
                    />
                  </div>
                  {/* <div className='form-group'>
                  <label htmlFor='re-pass'>
                    <i className='zmdi zmdi-lock-outline'></i>
                  </label>
                  <input
                    type='password'
                    name='re_pass'
                    id='re_pass'
                    placeholder='Repeat your password'
                  />
                </div> */}
                  <div className='form-group'>
                    <select
                      className='form-control'
                      required
                      onChange={this.onChangeRole}
                      value={this.state.role}
                    >
                      <option value=''>Role</option>
                      <option value='engineer'>Engineer</option>
                      <option value='company'>Company</option>
                    </select>
                  </div>
                  <div className='form-group form-button'>
                    <input
                      type='submit'
                      name='signup'
                      id='signup'
                      className='form-submit'
                      value='Register'
                    />
                  </div>
                </form>
              </div>
              <div className='signup-image'>
                <figure>
                  <img src='images/signup-image.jpg' alt='sing up' />
                </figure>
                <Link to='/login' className='signup-image-link'>
                  I am already member
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </HelmetProvider>
    );
  }
}
