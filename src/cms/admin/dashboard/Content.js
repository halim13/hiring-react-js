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
                <h1 className='m-0 text-dark'>Dashboard</h1>
              </div>
            </div>
          </div>
        </div>

        <div className='content'>
          <div className='container-fluid'>
            <div className='row'>
              {/* <div className='col-lg-6'>
                <div className='card card-primary card-outline'>
                  <div className='card-body'>
                    <h5 className='card-title'>Card title</h5>

                    <p className='card-text'>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <Link to='#/' className='card-link'>
                      Card link
                    </Link>
                    <Link to='#/' className='card-link'>
                      Another link
                    </Link>
                  </div>
                </div>
              </div> */}

              <div className='col-lg-3 col-6'>
                <div className='small-box bg-info'>
                  <div className='inner'>
                    <h3>150</h3>

                    <p className='text-white'>Companies</p>
                  </div>
                  <div className='icon'>
                    <i className='fa fa-users'></i>
                  </div>
                  <Link
                    to='/dashboard/admin/companies'
                    className='small-box-footer'
                  >
                    More info <i className='fas fa-arrow-circle-right'></i>
                  </Link>
                </div>
              </div>
              <div className='col-lg-3 col-6'>
                <div className='small-box bg-info'>
                  <div className='inner'>
                    <h3>150</h3>

                    <p className='text-white'>Engineers</p>
                  </div>
                  <div className='icon'>
                    <i className='fa fa-users'></i>
                  </div>
                  <Link
                    to='/dashboard/admin/engineers'
                    className='small-box-footer'
                  >
                    More info <i className='fas fa-arrow-circle-right'></i>
                  </Link>
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
