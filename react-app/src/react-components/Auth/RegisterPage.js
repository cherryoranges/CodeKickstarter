import React from "react"
import { login, postUser } from "../../actions/user"
import SkillsList  from "../Default/SkillsList"
import './Auth.css'
import  {Redirect} from 'react-router-dom'

function RegisterPage(props) {
    return (
        <div class='Page'>
            <div class="RegisterPage">
            <div class='AuthFormContainer'>
                
                <br/>
                <h1>Create an Account</h1>
                

                <RegisterForm app={props.app}/>
                <br/>

            </div>
            </div>
        </div>
    )
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            username: "",
            password: "",
            email: "",
            skills: [],
            picture: "",
            projects: [],
            starred: [],

            // non form fields
            redirect: null,
        }
    }
    render() {
        const {app} = this.props
        const onSubmit = () => {
            const {redirect, ...user} = this.state
            postUser(user)
            .then(() => login({username: user.username, password: user.password}, app) )
            .then(() => this.setState({redirect: <Redirect to="/"/>}))
        }
        return (
            <div class="RegisterForm">
                { this.state.redirect }
                <form>
                    <div class="FormInputDiv">
                        <label>Name:
                            <br/>
                            <input
                                type="text" 
                                value={this.state.name} 
                                onChange={ev => this.setState({name: ev.target.value})}
                            />
                        </label>
                    </div>

                    <br/>

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

                    <div class="FormInputDiv">
                        <label>Email:
                            <br/>
                            <input
                                type="text" 
                                value={this.state.email} 
                                onChange={ev => this.setState({email: ev.target.value})}
                            />
                        </label>
                    </div>

                    <br/>

                    <div class="FormInputDiv">
                    <SkillsList
                        label={"My skills"}
                        selectedSkills={this.state.skills}
                        onSelect={ev => this.setState({skills: [...this.state.skills, ev.target.value]})}
                        highlightedSkills={[]}
                    />
                    </div>
                    
                    <br/>

                    <div class="FormInputDiv">
                        <label>Picture (URL only):
                            <br/>
                            <input
                                type="text" 
                                value={this.state.picture} 
                                onChange={ev => this.setState({picture: ev.target.value})}
                            />
                        </label>
                    </div>

                    <br/>

                    <button onClick={onSubmit} type="button" class="RegisterButton">Sign Up</button>
                    
                </form>
            </div>
        )
    }
}

export default RegisterPage