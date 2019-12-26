import React, { Component } from 'react';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import jwt from 'jwt-decode';
import Loader from '../../partials/Loader';
import './LoginRegister.css';
import { connect } from 'react-redux';
import { UserLogin } from '../../public/redux/actions/UserLogin';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      role: '',
      isLoading: true,
      isLogin: localStorage.getItem('login'),
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
    if (token) {
      const user = jwt(token);
      if (user.role === 'engineer') {
        history.push('/companies');
      } else if (user.role === 'company') {
        history.push('/engineers');
      }
    }
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
  onSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });
    console.log(this.state);
    const obj = {
      username: this.state.username,
      password: this.state.password,
    };
    let token = '';
    let user = '';
    // this.props.fetch(this.state.username, this.state.password).then(() => {
    //   console.log(this.props.token.user);
    // });

    axios
      .post(`${process.env.REACT_APP_API_URL}login`, obj)
      .then(res => {
        // console.log(res)
        token = res.data.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('login', true);

        user = jwt(token);

        Swal.fire({
          title: 'Success!',
          text: 'Login Success',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
        });
        // this.props.fetch(token);
        // console.log(this.props.token);
        this.setState({
          isLogin: localStorage.getItem('login'),
        });
        if (user.role === 'engineer') {
          history.push('/companies');
        } else {
          history.push('/engineers');
        }
      })
      .catch(error => {
        // console.log(error.response.data.message);
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          showConfirmButton: false,
        });
      });
    this.setState({
      username: '',
      password: '',
      role: '',
      isLoading: false,
    });
  }
  render() {
    const helmetContext = {};
    const { user } = this.props.token;
    console.log(this.props.token.user);

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
          <title>Login</title>
        </Helmet>
        <Header isLogin={this.state.isLogin} />

        <section className='sign-in'>
          <div className='container'>
            <div className='signin-content'>
              <div className='signin-image'>
                <figure>
                  <img src='images/signin-image.jpg' alt='sing up' />
                </figure>
                <Link to='/register' className='signup-image-link'>
                  Create an account
                </Link>
              </div>

              <div className='signin-form'>
                <h2 className='form-title'>Login</h2>
                <form
                  onSubmit={this.onSubmit}
                  className='register-form'
                  id='login-form'
                >
                  <div className='form-group'>
                    <label forhtml='username'>
                      <i className='zmdi zmdi-account material-icons-name'></i>
                    </label>
                    <input
                      type='text'
                      name='username'
                      id='your_name'
                      placeholder='Username'
                      onChange={this.onChangeUserName}
                      value={this.state.username}
                    />
                  </div>
                  <div className='form-group'>
                    <label forhtml='your_pass'>
                      <i className='zmdi zmdi-lock'></i>
                    </label>
                    <input
                      type='password'
                      name='your_pass'
                      id='your_pass'
                      placeholder='Password'
                      onChange={this.onChangePassword}
                      value={this.state.password}
                    />
                  </div>
                  <div className='form-group form-button'>
                    <input
                      type='submit'
                      name='signin'
                      id='signin'
                      className='form-submit'
                      value='Log in'
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </HelmetProvider>
    );
  }
}

const mapStateToProps = state => ({
  token: state.userLogin,
});

const mapDispatchToProps = dispatch => ({
  fetch: (username, password) => dispatch(UserLogin(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
