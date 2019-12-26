import React, { Component } from 'react';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import Card from '../../partials/Card';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loader from '../../partials/Loader';
import jwt from 'jwt-decode';
import {
  Container,
  Pagination,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import './engineers.css';
import { connect } from 'react-redux';
import { fetchData } from '../../public/redux/actions/engineers';

class Engineers extends Component {
  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };
  wait = async (milliseconds = 500) => {
    await this.sleep(milliseconds);

    // this.setState({
    //   isLoadingFirst: false,
    // });
  };
  componentDidMount() {
    this.wait(500);
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (!token) {
      return history.push('/login');
    }
    const user = token ? jwt(token) : '';
    if (user.role === 'engineer') {
      return history.push('/companies');
    }
    this.props.fetch('', 'name', 'asc', 1, 5);
  }
  render() {
    const helmetContext = {};
    const { isLoading, isLoadingFirst, engineers, pages } = this.props;

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
          <title>Engineers</title>
        </Helmet>

        <Header />
        <div className='main-page'>
          <Container fluid className='sort'>
            <div className='order-by'>
              <Dropdown className='drop'>
                <DropdownButton title='Sort By' variant='dark'>
                  <Dropdown.Item
                    onClick={() => {
                      this.props.fetch(
                        pages.search,
                        'name',
                        pages.order,
                        pages.page,
                        pages.limit
                      );
                    }}
                  >
                    Name
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      this.props.fetch(
                        pages.search,
                        'skills',
                        pages.order,
                        pages.page,
                        pages.limit
                      );
                    }}
                  >
                    Skills
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      this.props.fetch(
                        pages.search,
                        'date_updated',
                        pages.order,
                        pages.page,
                        pages.limit
                      );
                    }}
                  >
                    Date Updated
                  </Dropdown.Item>
                </DropdownButton>
              </Dropdown>
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
                        1,
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
                        1,
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
                        1,
                        10
                      );
                    }}
                  >
                    10
                  </Dropdown.Item>
                </DropdownButton>
              </Dropdown>
            </div>
          </Container>

          {isLoading && (
            <div className='d-flex justify-content-center loading'>
              <Loader />
            </div>
          )}
          {!isLoading && (
            <Container fluid className='mainContents'>
              {engineers.map((item, index) => (
                <Card
                  key={index}
                  id={item.user_id}
                  photo={item.photo}
                  name={item.name}
                  specialist='Frontend Developer'
                  email={item.email}
                  salary={item.expected_salary}
                  skills={item.skills}
                  height={Math.floor(Math.random() * 260) + 70}
                />
              ))}
            </Container>
          )}
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
  engineers: state.engineers.items,
  pages: state.engineers.pages,
  isLoading: state.engineers.isLoading,
  isLoadingFirst: state.engineers.isLoadingFirst,
});

const mapDispatchToProps = dispatch => ({
  fetch: (search, sort, order, page, limit) =>
    dispatch(fetchData(search, sort, order, page, limit)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Engineers);
