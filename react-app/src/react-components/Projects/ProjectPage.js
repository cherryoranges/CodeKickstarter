import React from 'react'
import { SelectedItemList } from '../Default/Filter'
import { StarredIcon } from '../Default/Buttons'
import { PageSwitcherButton } from '../Navigation/NavBar'

import Loader from "react-loader-spinner";
// local css style
import './Projects.css'
import { DEFAULT_PROJECT, DEFAULT_USER } from '../DefaultData'
import { getProject, pullProjectToState, toggleTeamMember } from '../../actions/projects'
import { didUserStarProject, isUserOnProjectTeam, pullUserToState, starProject } from '../../actions/user'

import {AuthorButton} from './ProjectView'

class ViewProjectPage extends React.Component {
    componentDidMount() {
        const { app } = this.props
        
        // get projectId from url params
        const  projectId  = this.props.match.params.projectId

        // get project from api
        pullProjectToState(app, projectId)

    }
    
    render() {
        const { app } = this.props
        const { currentUser, project } = app.state
        const user = currentUser

        // Show loading indicator on fetch call
        const isLoading = project === null 

       
       
        if (isLoading) {
            return (
                <div class='Page'>
                    <h1 class="PageTitle">Project Info</h1>
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={'100%'}
                        width={'100%'}
                    />
                </div>
            )
        }

        const amIOnTeam = isUserOnProjectTeam(currentUser._id, project)
        const isStarred = didUserStarProject(currentUser, project._id)
        const onStar = () => {
            // toggle star 
            starProject(project._id, app.state.currentUser._id)
            .then(() => pullUserToState(app.state.currentUser._id, app))
            
            
        }
        const toggleTeamMembership = () => {
            toggleTeamMember(project._id, app.state.currentUser._id)
            .then(() => pullProjectToState(app, project._id))
        }

        return (
            <div class='Page'>

                <h1 class="PageTitle">Project Info</h1>
                <div class="ProjectInfoDiv">

                    <div class="HorizontalDiv">
                        <h2 class="ProjectName">{project.name}</h2>
                        <StarredIcon isSelected={isStarred} onClick={onStar}/>
                    </div>
                    
                    <div class="HorizontalDiv">
                        <div>
                            <div>
                                <p class="InfoText">Title</p>
                                <p class="ProjectDescription"> {project.description} </p>

                                <br/>
                                <p class="LabelText">Need skills: </p>
                                <SelectedItemList 
                                    itemList={project.skills}
                                    selectedItems={user.skills}
                                />
                            </div>
                            <br/>
                            <div>
                                <p class="InfoText">Author</p>
                                <AuthorButton author={project.author}/>
                            </div>
                        </div>
                            
                        
                        <img class="ProjectPagePicture"  src={project.image} />
                    </div>

                    <br/>

                    <div class="ViewProjectTeamSection">

                        <div class="TeamListDiv">
                                <h2>Current Team</h2>
                                <p>Team is at {project.team.length}/{project.capacity} members </p>
                                <ul>
                                    { project.team.map(user => <li><AuthorButton author={user} /></li>) }
                                </ul>
                        </div>

                        <br/>

                        <div class="HorizontalDiv">
                            
                            { amIOnTeam ? (
                                <div class='HorizontalDiv'>
                                    <div class="JoinButtonDiv">
                                        <PageSwitcherButton toRoute={`/develop/${project._id}`}>
                                            <button class="GotoWorkButton">Develop</button>
                                        </PageSwitcherButton>
                                    </div>

                                    <div class="LeaveButtonDiv">
                                        <button onClick={toggleTeamMembership} class="LeaveTeamButton">Leave Team</button>
                                    </div>
                                    
                                </div>
                            ) : (
                                <div class="JoinButtonDiv">
                                        <button onClick={toggleTeamMembership} class="JoinTeamButton">Join Team</button>
                                    </div>
                                )}
                        </div>
                        
                        <br/>
                    </div>
                </div>
            </div>       
        )
    }
}

export default ViewProjectPage;