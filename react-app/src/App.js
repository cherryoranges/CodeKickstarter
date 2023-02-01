import React from 'react'
import { Switch, Route, withRouter, } from 'react-router-dom'

import HomePage from './react-components/Home/HomePage'
import BrowsePage from './react-components/Projects/BrowsePage'
import AccountPage from './react-components/Account/AccountPage'
import ActivePage from './react-components/Projects/ActivePage'
import LaunchPage from './react-components/Projects/LaunchPage'
import ViewProjectPage from './react-components/Projects/ProjectPage'
import DevelopPage from './react-components/Projects/DevelopPage'
import RegisterPage from './react-components/Auth/RegisterPage'
import LoginPage from './react-components/Auth/LoginPage'

import './AppStyles.css';

import NavBar from './react-components/Navigation/NavBar';

import { logout } from "./actions/user";

import LookupUserPage from './react-components/Account/LookupUserPage'


class App extends React.Component {
  constructor(props) {
    super(props);

    // global state passed down includes the current logged in user.
    this.state = {
      error: null,
      currentUser: null,
      projects: [],
      project: null,

    }
    console.log(this.props, 'this.props')
  }



  componentDidMount() {
    // // check to see if a user is logged in
    // checkSession(this)

    // // IN PRODUCTION LOGIN AS DEFAULT USER
    //login({username: "user", password: "user"}, this)
  }


  render() {
    const isAuthenticated = this.state.currentUser !== null

    return (
      <div class="App">
        <NavBar
          app={this}
          onLogin={() => {
            this.props.history.push(`/login`)
          }}
          onLogout={() => {
            logout(this)
            this.props.history.push(`/`)
          }}
          isAuthenticated={isAuthenticated}
        />

        {!isAuthenticated ? (
          <h2 class="StatusMessage">Please Login to Continue</h2>
        ) : null}


        {this.state.error ? (<p class="ErrorMessage">Error: {this.state.error}</p>) : null}

        <Switch> {/* The Switch decides which component to show based on the current URL login/register pages */}


          {/* Show login/register page until isAuthenticated is open */}
          <Route exact path="/register" render={props => <RegisterPage {...props} app={this} />} ></Route>
          <Route exact path="/login" render={props => <LoginPage {...props} app={this} />} ></Route>

          {/* these are accessible via NavBar */}
          <Route exact path="/" render={props => <HomePage  {...props} app={this} />}></Route>
          <Route exact path="/browse" render={props => <BrowsePage {...props} app={this} />} ></Route>
          <Route exact path="/settings" render={props => <AccountPage {...props} app={this} />} ></Route>
          <Route exact path="/active" render={props => <ActivePage {...props} app={this} />} ></Route>
          <Route exact path="/launch" render={props => <LaunchPage {...props} app={this} />} ></Route>

          {/* these are other pages accessible through app interaction */}
          <Route exact path="/view-project/:projectId" render={props => <ViewProjectPage {...props} app={this} />} ></Route>
          <Route exact path="/develop/:projectId" render={props => <DevelopPage {...props} app={this} />} ></Route>

          <Route exact path="/lookup-user/:userId" render={props => <LookupUserPage {...props} />} ></Route>
        </Switch>
        )
      </div>
    );
  }
}

export default withRouter(App);
