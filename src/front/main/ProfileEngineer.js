import React, { Component } from 'react';

class ProfileEngineer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description:this.props.description,
      username:this.props.username,
      name:this.props.name,
      specialist:this.props.specialist,
      skills:this.props.skills,
      email:this.props.email,
      expected_salary:this.props.expected_salary,
      no_contact:this.props.no_contact,
      photo:this.props.photo,
      date_of_birth:this.props.date_of_birth[0],
      password:'',
      id:this.props.id,
      isLoading: true,
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div
        className='modal fade'
        id='engineerModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='engineerModalTitle'
        aria-hidden='true'
      >
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLongTitle'>
                Edit Engineer{this.state.id}
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
                  href='#home'
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
                  href='#profile'
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
                id='home'
                role='tabpanel'
                aria-labelledby='home-tab'
              >
                <form onSubmit={this.changeProfile}>
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
                            placeholder='Specialist'
                            onChange={(e)=>{this.setState({
                              specialist:e.target.value
                            })}}
                            value={this.state.specialist}
                          />
                        </div>
                      </div>
                      <div className='col-6 mb-3'>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Name'
                            value={this.state.name}
                            onChange={(e)=>{this.setState({
                              name:e.target.value
                            })}}
                          />
                        </div>
                      </div>
                      <div className='col-6 mb-3'>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Skills'
                            onChange={(e)=>{this.setState({
                              skills:e.target.value
                            })}}
                            value={this.state.skills}
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
                                onChange={(e)=>{this.setState({
                                  no_contact:e.target.value
                                })}}
                                value={this.state.no_contact}
                              />
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className='form-group'>
                              <input
                                type='email'
                                className='form-control'
                                placeholder='Email'
                                onChange={(e)=>{this.setState({
                                  email:e.target.value
                                })}}
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
                            onChange={(e)=>{this.setState({
                              description:e.target.value
                            })}}
                            value={this.state.description}
                          ></textarea>
                        </div>
                      </div>
                      <div className='col-6 mb-3'>
                        <div className='form-group'>
                          <input
                            type='date'
                            className='form-control'
                            placeholder='Date of Birth'
                            onChange={(e)=>{this.setState({
                              date_of_birth:e.target.value
                            })}}
                            value={this.state.date_of_birth}
                          />
                        </div>
                      </div>
                      <div className='col-6 mb-3'>
                        <div className='form-group'>
                          <input
                            type='number'
                            className='form-control'
                            placeholder='Expected Salary'
                            onChange={(e)=>{this.setState({
                              expected_salary:e.target.value
                            })}}
                            value={this.state.expected_salary}
                          />
                        </div>
                      </div>
                      <div className='col'>
                        <div className='form-group'>
                          <input type='file' className='form-control' accept="image/*"/>
                          <input
                            type='hidden'
                            value={this.state.photo}
                            className='form-control'
                          />
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
                  </div>
                </form>
              </div>
              <div
                className='tab-pane fade'
                id='profile'
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

export default ProfileEngineer;
