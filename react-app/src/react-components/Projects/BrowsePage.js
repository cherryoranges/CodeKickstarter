import React from 'react'
import PropTypes from 'prop-types'

import { SelectedItemList } from '../Default/Filter'
import { StarredIcon,  } from '../Default/Buttons'
import { PageSwitcherButton } from '../Navigation/NavBar'
import ProjectView from './ProjectView'

// import local css styles
import './Projects.css'
import { pullProjectsToState } from '../../actions/projects'
import { didUserStarProject, pullUserToState, starProject } from '../../actions/user'

import Loader from "react-loader-spinner";

class BrowseProjectsPage extends React.Component {
    componentDidMount() {
        const { app } = this.props
        // pull projects from api
        pullProjectsToState(app)
    }


    
    render() {
        const { app, projects } = this.props
        

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
        const renderedProjects = app.state.projects.map(p => renderProject(p))
        return (
            <div class='Page'>
                <h1 class="PageTitle">Browse Projects</h1>
                <div id='browsePage'>

                    {/* Filler example projects */}
                    <div class="ProjectViewList">
                        { renderedProjects }
                    </div>
                    

                </div>
            </div>
        )
    }
}

export default BrowseProjectsPage ;