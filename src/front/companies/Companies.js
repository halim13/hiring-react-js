import React, { Component } from 'react';
import Header from '../../partials/HeaderCompany';
import Footer from '../../partials/Footer';
import Card from '../../partials/CardCompanies';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loader from '../../partials/Loader';
import jwt from 'jwt-decode';
import {
  Container,
  Pagination,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import '../engineers/engineers.css';
import { connect } from 'react-redux';
import { fetchDataCompanies } from '../../public/redux/actions/companies';

class Companies extends Component {
  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (!token) {
      return history.push('/login');
    }
    const user = token ? jwt(token) : '';
    if (user.role === 'company') {
      return history.push('/engineers');
    }
    this.props.fetch('', 'name', 'asc', 1, 5);
  }

  cb = data => {
    this.setState({ search: data.pageDetail.search, isLoading: true });
    this.getQuery(
      `&search=${data.pageDetail.search}&page=${this.state.page}&limit=${this.state.limit}&order=${this.state.order}&sort=${this.state.sort}`
    );
  };
  render() {
    const helmetContext = {};
    const { companies, isLoading, isLoadingFirst, pages } = this.props;

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
          <title>Companies</title>
        </Helmet>
        <Header />
        <div className='main-page'>
          <Container fluid className='sort'>
            <div className='order-by'>
              <Dropdown className='drop'></Dropdown>
              <Dropdown className='drop'>
                <DropdownButton title='Order By' variant='dark'>
                  <Dropdown.Item
                    onClick={() => {
                      this.props.fetch(
                        pages.search,
                        pages.sort,
                        'asc',
                        pages.page,
                        pages.limit
                      );
                    }}
                  >
                    Ascending
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      this.props.fetch(
                        pages.search,
                        pages.sort,
                        'desc',
                        pages.page,
                        pages.limit
                      );
                    }}
                  >
                    Descending
                  </Dropdown.Item>
                </DropdownButton>
              </Dropdown>
              <Dropdown className='drop'>
                <DropdownButton title='Limit' variant='dark'>
                  <Dropdown.Item
                    onClick={() => {
                      this.props.fetch(
                        pages.search,
                        pages.sort,
                        pages.order,
                        pages.page,
                        1
                      );
                    }}
                  >
                    1
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      this.props.fetch(
                        pages.search,
                        pages.sort,
                        pages.order,
                        pages.page,
                        5
                      );
                    }}
                  >
                    5
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      this.props.fetch(
                        pages.search,
                        pages.sort,
                        pages.order,
                        pages.page,
                        10
                      );
                    }}
                  >
                    10
                  </Dropdown.Item>
                </DropdownButton>
              </Dropdown>
            </div>
            {isLoading && (
              <div className='d-flex justify-content-center loading'>
                <Loader />
              </div>
            )}
          </Container>
          <Container fluid className='mainContents'>
            {companies.map((item, index) => (
              <Card
                key={index}
                id={item.user_id}
                photo={item.logo}
                name={item.name}
                location={item.location}
                email={item.email}
                skills={item.skills}
                contact={item.no_contact}
                // height={200}
                height={Math.floor(Math.random() * 260) + 70}
              />
            ))}
          </Container>
          <Container fluid className='pagination'>
            {pages.totalPage === 0 ? (
              <h1>No data Found!</h1>
            ) : (
              <Pagination size='lg'>
                {parseInt(pages.page) <= 1 ? (
                  <Pagination.First disabled />
                ) : (
                  <Pagination.First
                    onClick={() => {
                      this.props.fetch(
                        pages.search,
                        pages.sort,
                        pages.order,
                        1,
                        pages.limit
                      );
                    }}
                  />
                )}
                {pages.prevLink ? (
                  <Pagination.Prev
                    onClick={() => {
                      this.props.fetch(
                        pages.search,
                        pages.sort,
                        pages.order,
                        parseInt(pages.page) - 1,
                        pages.limit
                      );
                    }}
                  >
                    Previous
                  </Pagination.Prev>
                ) : (
                  <Pagination.Prev disabled>Previous</Pagination.Prev>
                )}

                <Pagination.Item active>
                  {pages.page}/{pages.totalPage}
                </Pagination.Item>

                {pages.nextLink ? (
                  <Pagination.Next
                    onClick={() => {
                      this.props.fetch(
                        pages.search,
                        pages.sort,
                        pages.order,
                        parseInt(pages.page) + 1,
                        pages.limit
                      );
                    }}
                  >
                    Next
                  </Pagination.Next>
                ) : (
                  <Pagination.Next disabled>Next</Pagination.Next>
                )}

                {parseInt(pages.page) >= parseInt(pages.totalPage) ? (
                  <Pagination.Last disabled />
                ) : (
                  <Pagination.Last
                    onClick={() => {
                      this.props.fetch(
                        pages.search,
                        pages.sort,
                        pages.order,
                        pages.totalPage,
                        pages.limit
                      );
                    }}
                  />
                )}
              </Pagination>
            )}
          </Container>
        </div>
        <Footer />
      </HelmetProvider>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies.items,
  pages: state.companies.pages,
  isLoading: state.companies.isLoading,
  isLoadingFirst: state.companies.isLoadingFirst,
});

const mapDispatchToProps = dispatch => ({
  fetch: (search, sort, order, page, limit) =>
    dispatch(fetchDataCompanies(search, sort, order, page, limit)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Companies);
