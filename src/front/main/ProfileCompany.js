import React, { Component } from 'react';
import jwt from 'jwt-decode';
import { connect } from 'react-redux';
import { updateCompany,deleteCompany } from '../../public/redux/actions/companies';
import slugify  from 'slugify'
import Swal from 'sweetalert2';

class ProfileCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      location: this.props.location,
      username: this.props.username,
      user_id: this.props.user_id,
      name: this.props.name,
      email: this.props.email,
      no_contact: this.props.no_contact,
      photo: this.props.photo,
      old_photo: this.props.photo,
      location: this.props.location,
      password: '',
      isLoading: true,
    };
  }
  componentDidMount() {}
  handleImage = e => {
    const filename = e.target.files[0]
    // const photo = `${slugify(filename,'_')}`
    this.setState({
      photo:filename
    });
    // console.log(e.target.files[0].name)
    console.log(e.target.files[0])
  };
  delete = async e=>{
    e.preventDefault();
     
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.value) {
    this.props.deleteData(this.state.user_id).then(()=>{
      Swal.fire({
        title: 'Success!',
        text: 'Success Delete Data!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });
      localStorage.removeItem('token')
      localStorage.removeItem('login')
      window.location.reload();
    })
  }
})
      
  }
  update = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    // const { name } = this.state;
    // return console.log(this);
    const user = jwt(token);
    // console.log(user)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        authorization: 'Bearer ' + token,
      },
    };
    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('user_id', user.id);
    formData.append('description', this.state.description);
    formData.append('email', this.state.email);
    formData.append('no_contact', this.state.no_contact);
    formData.append('logo', this.state.photo);
    formData.append('old_logo', this.state.old_photo);
    formData.append('location', this.state.location);
    this.props.updateData(user.id, formData, config).then(res=>{
      Swal.fire({
        title: 'Success!',
        text: 'Success Update Data!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });
      window.location.reload();

    });
    console.log(this.state.name);
  };
  render() {
    return (
      <div
        className='modal fade'
        id='companyModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='companyModalTitle'
        aria-hidden='true'
      >
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLongTitle'>
                Edit Company
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <ul className='nav nav-tabs' id='myTab' role='tablist'>
              <li className='nav-item'>
                <a
                  className='nav-link active'
                  id='home-tab'
                  data-toggle='tab'
                  href='#homeCompany'
                  role='tab'
                  aria-controls='home'
                  aria-selected='true'
                >
                  Profile
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  id='profile-tab'
                  data-toggle='tab'
                  href='#profileCompany'
                  role='tab'
                  aria-controls='profile'
                  aria-selected='false'
                >
                  Password
                </a>
              </li>
            </ul>
            <div className='tab-content' id='myTabContent'>
              <div
                className='tab-pane fade show active'
                id='homeCompany'
                role='tabpanel'
                aria-labelledby='home-tab'
              >
                <form onSubmit={this.update}>
                  <div className='modal-body'>
                    <div className='row'>
                      <div className='col-6 mb-3'>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='username'
                            value={this.state.username}
                            disabled
                          />
                        </div>
                      </div>
                      <div className='col-6 mb-3'>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Name'
                            onChange={e => {
                              this.setState({
                                name: e.target.value,
                              });
                            }}
                            value={this.state.name}
                          />
                        </div>
                      </div>
                      <div className='col-6 mb-3'>
                        <div className='row'>
                          <div className='col-12 mb-3'>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Contact Number'
                                onChange={e => {
                                  this.setState({
                                    no_contact: e.target.value,
                                  });
                                }}
                                value={this.state.no_contact}
                              />
                            </div>
                          </div>
                          <div className='col-12 mb-3'>
                            <div className='form-group'>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Location'
                                onChange={e => {
                                  this.setState({
                                    location: e.target.value,
                                  });
                                }}
                                value={this.state.location}
                              />
                            </div>
                          </div>
                          <div className='col-12 mb-3'>
                            <div className='form-group'>
                              <input
                                type='email'
                                className='form-control'
                                placeholder='Email'
                                onChange={e => {
                                  this.setState({
                                    email: e.target.value,
                                  });
                                }}
                                value={this.state.email}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-6 mb-3'>
                        <div className='form-group'>
                          <textarea
                            className='form-control'
                            placeholder='Description'
                            style={{ height: '100px' }}
                            onChange={e => {
                              this.setState({
                                description: e.target.value,
                              });
                            }}
                            value={this.state.description}
                          ></textarea>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='form-group'>
                          <input
                            type='hidden'
                            className='form-control'
                            value={this.state.old_photo}
                          />
                          <input type='file' className='form-control' onChange={(e)=>{this.handleImage(e)}} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-dismiss='modal'
                    >
                      Close
                    </button>
                    <button type='submit' className='btn btn-primary'>
                      Edit
                    </button>
                    <button type='button' className='btn btn-primary' onClick={(e)=>{this.delete(e)}} >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
              <div
                className='tab-pane fade'
                id='profileCompany'
                role='tabpanel'
                aria-labelledby='profile-tab'
              >
                <form>
                  <div className='modal-body'>
                    <div className='form-group'>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='Current Password'
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='New Password'
                      />
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-dismiss='modal'
                    >
                      Close
                    </button>
                    <button type='submit' className='btn btn-primary'>
                      Edit
                    </button>
                    <button type='button' className='btn btn-primary' onClick={(e)=>{this.delete(e)}} >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.singleCompany.items,
  isLoading: state.singleCompany.isLoading,
  isLoadingFirst: state.singleCompany.isLoadingFirst,
});

const mapDispatchToProps = dispatch => ({
  updateData: (id, data, config) => dispatch(updateCompany(id, data, config)),
  deleteData: (id, config) => dispatch(deleteCompany(id, config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCompany);
