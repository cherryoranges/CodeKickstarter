import React from 'react'

import { TextButton } from '../Default/Buttons'
import { SelectedItemList } from '../Default/Filter'
import SkillsList from '../Default/SkillsList'
import { Redirect } from "react-router-dom";

// local styling
import './Projects.css'

import {postProject, pullProjectToState} from '../../actions/projects'

export class NewProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // exact project fields
            name: "",
            author: props.userId,
            description: "",
            image: "",
            skills: [],
            capacity: 0,
            team: [props.userId], // you are a member of the team and an admin by default as creator
            admins: [props.userId],
            features: [],
            isFinished: false,

            // non-project fields
            redirect: null,
        }
    }

    render() {
        let redirect = null
        const createProject = () => {
            const { redirect, ...project } = this.state

            postProject(project)
            // pull and redirect to project page for new 
            .then((project) => this.setState({redirect: <Redirect to={`/view-project/${project._id}`}/>}) )
        }

        return (
            <div class="NewProjectForm">
                { this.state.redirect }
            <form>

                <div class="FormInputDiv">
                    <label>Project Name:
                        <input
                            type="text" 
                            value={this.state.name} 
                            onChange={ev => this.setState({name: ev.target.value})}
                        />
                    </label>
                </div>

                <div class="FormInputDiv">
                <label>Project Description:
                    <textarea
                        value={this.state.description} 
                        onChange={ev => this.setState({description: ev.target.value})}
                    />
                    </label>
                </div>

                <div class="FormInputDiv">
                <SkillsList 
                    label={"Skills Needed"}
                    selectedSkills={this.state.skills} 
                    onSelect={ev => this.setState({skills: [...this.state.skills, ev.target.value]})}
                    highlightedSkills={this.props.mySkills}
                />
                </div>
                
                <div class="FormInputDiv">
                <label>Team Capacity:
                    <input
                        type="number"
                        value={this.state.capacity}
                        onChange={ev => this.setState({capacity: ev.target.value})}
                    />
                </label>
                </div>
                
                <div class="FormInputDiv">
                <label>Project Image:
                    <input
                        value={this.state.image} 
                        onChange={ev => this.setState({image: ev.target.value})}
                    />
                </label>
                </div>
                
                <button type="button" onClick={createProject} class="LaunchProjectButton">Launch Project</button>
            </form>
            </div>
        )
    }
}

function NewProjectPage (props) {
    const { app } = props
    console.log(app.state)
    const mySkills = app.state.currentUser.skills
    const userId = app.state.currentUser._id

    return (
        <div class='Page'>
            <div id='newProjectPage'>
                <h1 class="PageTitle">Launch a New Project</h1>
                <NewProjectForm userId={userId} mySkills={mySkills}/>
            </div>
        </div>
    )
}

export default NewProjectPage;