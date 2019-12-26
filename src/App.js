import React from 'react'
// import logo from './logo.svg'
import './App.css'
import { Switch, Route } from 'react-router-dom'

// import component
import Main from './front/main/Main'
import Login from './front/main/Login'
import Register from './front/main/Register'
import Engineers from './front/engineers/Engineers'
import SingleEngineer from './front/engineers/SingleEngineers'
import Companies from './front/companies/Companies'
import SingleCompany from './front/companies/SingleCompany'
import Profile from './front/main/Profile'
import DashboardAdmin from './cms/admin/dashboard/Dashboard'
import DashboardAdminCompanies from './cms/admin/Companies/Companies'
import DashboardAdminEngineers from './cms/admin/Engineers/Engineers'
import DashboardAdminProfile from './cms/admin/Profile/Profile'
import NotFound from './partials/NotFound'
import { Provider } from 'react-redux'
// import store
import store from './public/redux/store/index'

function App () {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/register/' component={Register} />
        <Route exact path='/engineers/' component={Engineers} />
        <Route path='/engineer/:id' component={SingleEngineer} />
        <Route exact path='/companies/' component={Companies} />
        <Route path='/company/:id' component={SingleCompany} />
        <Route path='/profile' component={Profile} />
        <Route exact path='/dashboard/admin/' component={DashboardAdmin} />
        <Route
          exact
          path='/dashboard/admin/companies/'
          component={DashboardAdminCompanies}
        />
        <Route
          path='/dashboard/admin/engineers'
          component={DashboardAdminEngineers}
        />
        <Route
          path='/dashboard/admin/profile'
          component={DashboardAdminProfile}
        />
        <Route path='*' component={NotFound} />
      </Switch>
    </Provider>
  )
}

export default App
