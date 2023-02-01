import React from "react"
import { Redirect } from "react-router-dom";
import { login } from "../../actions/user";
import { PageSwitcherButton } from '../Navigation/NavBar'
import './Auth.css'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: null 
        }
    }



    render() {
        const {app} = this.props
        return (
            <div class='Page'>
                {/*  On succesfull login redirect to home */}
                { (app.state.currentUser !== null) ? <Redirect to="/browse" /> : null }  
                <div class="LoginPage">
                <div class='AuthFormContainer'>
                    <h1>Login</h1>
                    <LoginForm onSubmit={(username, password) => { login({username, password}, app) }}/>
                    <br/>
                    <RegisterButton />

                </div>

                <br/>

                </div>
                
            </div>
        )
    }
}


const RegisterButton = () => {
    return (
      <button
        class="RegisterButton"
        onClick={() => {}}
      >
        <PageSwitcherButton toRoute={"/register"}>
            Sign Up
        </PageSwitcherButton>
      </button>
    );
  };


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
    }
    render() {
       

        return (
                <form class="LoginForm">
                    <div class="FormInputDiv">
                        <label>Username:
                            <br/>
                            <input
                                type="text" 
                                value={this.state.username} 
                                onChange={ev => this.setState({username: ev.target.value})}
                            />
                        </label>
                    </div>

                    <br/>

                    <div class="FormInputDiv">
                        <label>Password:
                            <br/>
                            <input
                                type="text" 
                                value={this.state.password} 
                                onChange={ev => this.setState({password: ev.target.value})}
                            />
                        </label>
                    </div>

                    <br/>

                    <button type="button" class="LoginButton" onClick={() => this.props.onSubmit(this.state.username, this.state.password)}>Login</button>
                    
                </form>
        )
    }
}

export default LoginPage