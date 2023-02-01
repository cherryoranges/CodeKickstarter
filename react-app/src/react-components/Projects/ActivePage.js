import React from 'react'
import PropTypes from 'prop-types'

import { SelectedItemList } from '../Default/Filter'
import { StarredIcon, TextButton } from '../Default/Buttons'
import { PageSwitcherButton } from '../Navigation/NavBar'
import ProjectView from './ProjectView'


// import local css styling
import './Projects.css'
import { pullProjectsToState } from '../../actions/projects'
import { didUserStarProject, pullUserToState, starProject } from '../../actions/user'

import Loader from "react-loader-spinner";
                
// Main page for browsing my projects
class MyProjectsPage extends React.Component {
    componentDidMount() {
        const {app} = this.props
        // pull users projects from api
        pullProjectsToState(app)
    }
    render() {
        const { app,  } = this.props
        const {projects} = app.state
        
        // Show loading indicator on fetch call
        const isLoading = projects === []
        
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

        const renderProject = (projectObj) => {
            const isStarred = didUserStarProject(app.state.currentUser, projectObj._id) 
            const mySkills = app.state.currentUser.skills
            const onStar = () => {
                // toggle star 
                starProject(projectObj._id, app.state.currentUser._id)
                .then(() => pullUserToState(app.state.currentUser._id, app))
                
                
            }
            return (
            <ProjectView 
                onStar={onStar}
                buttons={
                    <div class="LearnMoreButtonDiv">
                        <PageSwitcherButton toRoute={`/view-project/${projectObj._id}`}>
                            <button class="MoreInfoButton">More info</button>
                        </PageSwitcherButton>
                    </div>
                }
                projectImage={projectObj.image} 
                projectName={projectObj.name} 
                projectAuthor={projectObj.author}
                projectDescription={projectObj.description}
                projectSkills={projectObj.skills} 
                mySkills={ mySkills } 
                isStarred={ isStarred }
                isFinished={projectObj.isFinished} 
            />
            )
        }
        const userId = app.state.currentUser._id

        return (
            <div class='Page'>
                <div id='myProjectsPage'>
                    <h1 class="PageTitle">Active Projects</h1>

                    <div class="MyProjectsSection">
                        <div class="ProjectViewList">
                            
                            { projects.filter(p => 
                                p.team.filter(u => u._id === userId).length > 0 || 
                                p.admins.filter(u => u._id === userId).length > 0)
                                .map(p => renderProject(p)) 
                            }
                        </div>
                    </div>

                    <br/>


                        
                </div>
            </div>
        )
    }
}

export default MyProjectsPage;