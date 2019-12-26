import React from 'react'
import { Link } from 'react-router-dom'

function Content () {
  return (
    <>
      <div className='content-wrapper'>
        <div className='content-header'>
          <div className='container-fluid'>
            <div className='row mb-2'>
              <div className='col-sm-6'>
                {/* <h1 className='m-0 text-dark'>Companies</h1> */}
              </div>
            </div>
          </div>
        </div>

        <div className='content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12'>
                <div className='card'>
                  <div className='card-header'>
                    <h3 className='card-title'>Companies list</h3>

                    <div className='card-tools'>
                      <div
                        className='input-group input-group-sm'
                        style={{ width: '150px' }}
                      >
                        <input
                          type='text'
                          name='table_search'
                          className='form-control float-right'
                          placeholder='Search'
                        />
                        <div className='input-group-append'>
                          <button type='submit' className='btn btn-default'>
                            <i className='fas fa-search'></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card-body table-responsive p-0'>
                    <table className='table table-hover'>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Location</th>
                          <th>No Contact</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>183</td>
                          <td>John Doe</td>
                          <td>11-7-2014</td>
                          <td>Approved</td>
                          <td>mail@mail.com</td>
                          <td>
                            <Link to='#' className='text-dark'>
                              <i className='fa fa-eye'></i>
                            </Link>
                            {' / '}
                            <Link to='#' className='text-dark'>
                              <i className='fa fa-edit'></i>
                            </Link>
                            {' / '}
                            <Link to='#' className='text-dark'>
                              <i className='fa fa-trash'></i>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className='card-footer clearfix'>
                    <ul className='pagination pagination-sm m-0 float-right'>
                      <li className='page-item'>
                        <Link className='page-link' href='#'>
                          &laquo;
                        </Link>
                      </li>
                      <li className='page-item'>
                        <Link className='page-link' href='#'>
                          1
                        </Link>
                      </li>
                      <li className='page-item'>
                        <Link className='page-link' href='#'>
                          2
                        </Link>
                      </li>
                      <li className='page-item'>
                        <Link className='page-link' href='#'>
                          3
                        </Link>
                      </li>
                      <li className='page-item'>
                        <Link className='page-link' href='#'>
                          &raquo;
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Content
