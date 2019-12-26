import React, { Component } from 'react';
import { Container, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoArkademy from '../images/arkademy.svg';
import LogoDefault from '../images/default.png';
import './Header.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import jwt from 'jwt-decode';
import { connect } from 'react-redux';
import { fetchDataCompanies } from '../public/redux/actions/companies';

class HeaderCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new: true,
      profile: [],
      photo: LogoDefault,
      search: props.search,
      showMenu: false,
      isLoading: false,
      isLogin: localStorage.getItem('login')
        ? localStorage.getItem('login')
        : false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const user = token ? jwt(token) : '';
    const hasLogin = localStorage.getItem('login');
    if (hasLogin) {
      axios
        .get(`${process.env.REACT_APP_API_URL}${user.role}/${user.id}`)
        .then(res => {
          if (user.role === 'engineer') {
            const photo = res.data.engineersData[0].photo
              ? res.data.engineersData[0].photo
              : LogoDefault;
            this.setState({
              profile: res.data.engineersData[0],
              photo,
              isLoading: false,
              new: false,
            });
          } else if (user.role === 'company') {
            const photo = res.data.data[0].logo
              ? res.data.data[0].logo
              : LogoDefault;
            this.setState({
              profile: res.data.data[0],
              photo,
              isLoading: false,
              new: false,
            });
          }
        })
        .catch(err => {
          this.setState({ isLoading: false });
          this.setState({
            new: true,
            photo: LogoDefault,
            isLoading: false,
          });
        });
    }
  }
  home = e => {
    const token = localStorage.getItem('token');
    const user = token ? jwt(token) : '';
    const { history } = this.props;
    if (user.role === 'engineer') {
      history.push('/company');
    } else if (user.role === 'company') {
      history.push('/engineer');
    }
  };
  logout = e => {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    const { history } = this.props;
    this.setState({
      isLogin: false,
    });
    history.push('/login');
  };

  handleOnInputChange = e => {
    const { pages } = this.props;
    this.props.fetch(e.target.value, pages.sort, pages.order, 1, pages.limit);
  };
  render() {
    const token = localStorage.getItem('token');
    const user = token ? jwt(token) : [];
    return (
      <Container fluid className='header'>
        <div className='logo'>
          <Link to='/'>
            <img src={LogoArkademy} alt='' />
          </Link>
        </div>
        <div className='search'>
          <i className='fa fa-search logoSearch'></i>
          <FormControl
            className='formSearch'
            placeholder='Search...'
            aria-describedby='basic-addon1'
            onChange={this.handleOnInputChange}
          />
        </div>
        <ul className='navigation'>
          <li>
            <Link to='' onClick={this.home}>
              Home
            </Link>
          </li>
          {this.state.isLogin ? (
            <>
              <li>
                <Link to='/profile' className='diff'>
                  <div
                    className='profile'
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_BASE_URL}engineers/${this.state.photo})`,
                    }}
                  ></div>
                  <span className='nameUser'>{user.username}</span>
                </Link>
              </li>
              <li>
                <div className='divider'>s</div>
              </li>
              <li>
                <Link to='/dashboard/admin/messages'>
                  <i className='fa fa-wechat icons'></i>
                </Link>
              </li>
              <li>
                <Link to='' onClick={this.logout}>
                  <i className='fa fa-sign-out icons'></i>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <div className='diff'>
                  <Link to='/login'>Login</Link>
                  <span className='div'>/</span>
                  <Link to='/register'>Register</Link>
                </div>
              </li>
            </>
          )}
        </ul>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  engineers: state.companies.items,
  pages: state.companies.pages,
  isLoading: state.companies.isLoading,
  isLoadingFirst: state.companies.isLoadingFirst,
});

const mapDispatchToProps = dispatch => ({
  fetch: (search, sort, order, page, limit) =>
    dispatch(fetchDataCompanies(search, sort, order, page, limit)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderCompany));
// export default withRouter(Header);
