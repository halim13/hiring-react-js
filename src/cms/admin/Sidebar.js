import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import jwt from 'jwt-decode';
import axios from 'axios';
import LogoArkademy from '../../images/arkademy.png';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      logo: '',
      userId: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const user = token ? jwt(token) : '';

    if (!user) {
      return history.push('/login');
    }
    // eslint-disable-next-line
    const getuser = user
      ? axios
          .get(`${process.env.REACT_APP_API_URL}${user.role}/${user.id}`)
          .then(res => {
            console.log(res.data);
            const profile = res.data.engineersData[0];
            this.setState({
              name: profile.name,
              userId: profile.user_id,
              logo: profile.photo,
            });
          })
          .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
          })
      : '';
  }
  logout = e => {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    const { history } = this.props;
    history.push('/');
  };
  render() {
    return (
      <>
        <aside className='main-sidebar sidebar-dark-primary elevation-4'>
          <Link to='index3.html' className='brand-link'>
            <img
              src={LogoArkademy}
              alt='AdminLTE Logo'
              className='brand-image img-circle elevation-3'
              style={{ opacity: '0.8' }}
            />
            <span className='brand-text font-weight-light'>ARKADEMY</span>
          </Link>

          <div className='sidebar'>
            <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
              <div className='image'>
                {/* <img
                  src={this.state.logo}
                  className='img-circle elevation-2'
                  alt='User'
                /> */}
              </div>
              <div className='info'>
                <Link to='#/' className='d-block'>
                  {this.state.name}
                </Link>
              </div>
            </div>

            <nav className='mt-2'>
              <ul
                className='nav nav-pills nav-sidebar flex-column'
                data-widget='treeview'
                role='menu'
                data-accordion='false'
              >
                <li className='nav-item'>
                  <Link to='/dashboard/admin/' className='nav-link'>
                    <i className='nav-icon fas fa-th'></i>
                    <p className='text-white'>Dashboard</p>
                  </Link>
                </li>
                <li className='nav-item has-treeview'>
                  <Link to='#/' className='nav-link'>
                    <i className='nav-icon fas fa-tachometer-alt'></i>
                    <p className='text-white'>
                      Management
                      <i className='right fas fa-angle-left'></i>
                    </p>
                  </Link>
                  <ul className='nav nav-treeview'>
                    <li className='nav-item'>
                      <Link
                        to='/dashboard/admin/companies'
                        className='nav-link'
                      >
                        <i className='fa fa-users nav-icon'></i>
                        <p className='text-white'>Companies</p>
                      </Link>
                      <Link
                        to='/dashboard/admin/engineers'
                        className='nav-link'
                      >
                        <i className='fa fa-users nav-icon'></i>
                        <p className='text-white'>Engineers</p>
                      </Link>
                      {/* <Link to='/dashboard/admin/messages' className='nav-link'>
                        <i className='fa fa-wechat nav-icon'></i>
                        <p className='text-white'>Messages</p>
                      </Link> */}
                    </li>
                  </ul>
                </li>
                <li className='nav-item'>
                  <Link to='/dashboard/admin/profile' className='nav-link'>
                    <i className='nav-icon fa fa-user'></i>
                    <p className='text-white'>Profile</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='' className='nav-link' onClick={this.logout}>
                    <i className='nav-icon fa fa-sign-out'></i>
                    <p className='text-white'>Logout</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </>
    );
  }
}

export default withRouter(Sidebar);
