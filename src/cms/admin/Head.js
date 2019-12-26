import React from 'react'
import { Link } from 'react-router-dom'

function Head () {
  return (
    <>
      <nav className='main-header navbar navbar-expand navbar-white navbar-light'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link className='nav-link' data-widget='pushmenu' to='#/'>
              <i className='fas fa-bars'></i>
            </Link>
          </li>
          <li className='nav-item d-none d-sm-inline-block'>
            <Link to='/' className='nav-link'>
              Home
            </Link>
          </li>
        </ul>
        <form className='form-inline ml-3'>
          <div className='input-group input-group-sm'>
            <input
              className='form-control form-control-navbar'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <div className='input-group-append'>
              <button className='btn btn-navbar' type='submit'>
                <i className='fas fa-search'></i>
              </button>
            </div>
          </div>
        </form>
      </nav>
    </>
  )
}

export default Head
