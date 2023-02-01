import React from 'react'
import { SelectedItemList } from '../Default/Filter'
import { StarredIcon, TextButton } from '../Default/Buttons'
import { PageSwitcherButton } from '../Navigation/NavBar'
import ReactList from 'react-list'
import Loader from "react-loader-spinner";
import {AuthorButton} from './ProjectView'

// local css style
import './Projects.css'
import { DEFAULT_PROJECT, DEFAULT_USER, Feature, Task } from '../DefaultData'
import { patchProject, pullProjectToState } from '../../actions/projects'
import { isObjInList } from '../../helpers'
import { patchTask } from '../../actions/task'



function ItemList({renderItem, items}) {
    return (
        <div class="ItemList">
            { items.map(c => renderItem(c)) }
        </div>
    )
}


class NewFeatureForm extends React.Component {
    // props: submitForm: fn
    constructor(props) {
        super(props)
        this.state = {
            featureName: "",
            featureDescription: "",
            tasksStr: "",
        }
    }

    submitForm() {
        this.props.onSubmit(this.state)
    }

    render() {
        return (
            <div class="NewFeatureForm">
            <form>

                <div class="FormInputDiv">
                    <label>Feature Name:
                        <br/>
                        <input
                            type="text" 
                            value={this.state.featureName} 
                            onChange={ev => this.setState({featureName: ev.target.value})}
                        />
                    </label>
                </div>

                <div class="FormInputDiv">
                <label>Feature Description:
                    <textarea
                        value={this.state.featureDescription} 
                        onChange={ev => this.setState({featureDescription: ev.target.value})}
                    />
                    </label>
                </div>
                
                <div class="FormInputDiv">
                    <label>List of Tasks
                        <br/>
                        <textarea 
                            placeholder={"Enter list of tasks seperated by a newline"}
                            value={this.state.tasksStr} 
                            onChange={ev => this.setState({tasksStr: ev.target.value})} />
                    </label>
                   
                </div>

                <br/>
                
                <button 
                    type="button"
                    onClick={ this.submitForm.bind(this) } 
                    class="SubmitFeatureButton">Submit</button>
            </form>
            </div>
        )
    }
}


class StickiesList extends React.Component {
    // this.props= stickies: list, columnIdx: [0, 3], app, feature
    constructor(props){
        super(props)
    }

    renderStickie(index, key) {
        const {app} = this.props

        const s = this.props.stickies[index]
        const project = app.state.project
        const userId = app.state.currentUser._id
        const amIContributer = s.contributors.filter(u => u._id === this.props.userId).length > 0
        const amIAdmin = isObjInList(app.state.project.admins, userId)
        const featureId = this.props.feature._id
        // task actions
        const projectId = project._id

        // contributor actions
        const pushChanges = () => {
            patchTask(projectId, featureId, s._id, s)
            .then(() => pullProjectToState(app, projectId))
            .then(() => console.log(project, project === app.state.project, s))
        }
        const toggleContributor = () => {
            if (isObjInList(s.contributors, userId)) {
                s.contributors = s.contributors.filter(u => u !== userId)
            } else {
                s.contributors.push(userId)
            }
            s.status = 1

            // change updated stickie in project and patch it 
            pushChanges()
            
        }
        const submitContribution = () => {
            s.status = 2

            pushChanges()
        }
        const cancelContribution = () => {
            console.log(s)
            s.status = 0
            s.contributors = s.contributors.filter(u => u !== userId)

            pushChanges()
        }
        
        // admin actions
        const acceptContribution = () => {
            s.status = 3

            pushChanges()
        }
        const denyContribution = () => {
            s.status = 1

            pushChanges()
        }

        return (
            <div class={amIContributer ? "MyStickieDiv" : "NotMyStickieDiv"}>
                <p class="StickieType"> {amIContributer ? "MINE" : null} </p>

                <p class="StickieText">{s.text}</p>

                {/* show contributor or button */}
                { (s.contributors.length > 0) ? null : (<button onClick={toggleContributor} class='ContributeButton'>Contribute</button>) 
                }

                {/* in-progress column. only contributers can progress these stickies */}
                {(this.props.columnIdx == 1) ?
                     amIContributer ? (
                        (<div class="HorizontalDiv">
                            <button onClick={cancelContribution} class='CancelButton'>Cancel</button>
                            <button onClick={submitContribution} class='SubmitButton'>Submit</button>
                        </div>)
                    ) : (null)
                     : null
                }

                {/* awaiting review colum. only admins can progress from here */}
                {(this.props.columnIdx == 2) ?
                    amIAdmin ? (
                        (<div class="HorizontalDiv">
                            <button onClick={denyContribution} class='DenyButton'>Deny</button>
                            <button onClick={acceptContribution} class='AcceptButton'>Accept</button>
                        </div>)
                    ) : (null)
                     : null
                }
                
            </div>
        )
    }
    render() {
        return (
            <div class="StickiesList">
                <ReactList
                    itemRenderer={this.renderStickie.bind(this)}
                    length={this.props.stickies.length}
                    type='uniform'
                />
            </div>
        )
    }
}

class KanbanBoard extends React.Component {
    //props: userId: number, feature: obj: admns: list
    constructor(props) {
        super(props)
        this.state = {}
        
    }
    
    render() {
        const {app} = this.props
        // lambda to get tasks for kanban column. 
        // stickie.status == 0 => TODO, stickie.status == 1 => In Progress
        // stickie.status == 2 => Awaiting Review, stickie.status == 3 => Done
        const filterTasks = (tasks, statusCode) => tasks.filter(t => t.status === statusCode)

        console.log(this.props.feature.tasks, filterTasks(this.props.feature.tasks, 0))
        
        
        return (
            <div id="KanbanView">
                <div id="InfoDiv">
                        <p id="featureName">{this.props.feature.name}</p>
                        <p id="featureDescription">{this.props.feature.description}</p>
                </div>

                <div id="KanbanBoard">
                
                    <div class="StickiesDiv">
                        
                        <div class="StickiesColumn">
                            <div class="FirstStickiesColumn">
                                <p class="ColumnTitle">TODO</p>
                                <StickiesList 
                                    stickies={ filterTasks(this.props.feature.tasks, 0) } 
                                    columnIdx={0}
                                    app={app}
                                    feature={this.props.feature}
                                />
                            </div>
                        </div>

                        <div class="StickiesColumn">
                            <p class="ColumnTitle">In Progress</p>
                            <StickiesList 
                                stickies={ filterTasks(this.props.feature.tasks, 1) }
                                columnIdx={1}
                                app={app}
                                feature={this.props.feature}
                                
                            />
                        </div>

                        <div class="StickiesColumn">
                            <p class="ColumnTitle">Awaiting Review</p>
                            <StickiesList 
                                stickies={ filterTasks(this.props.feature.tasks, 2) }
                                columnIdx={2}
                                app={app}
                                feature={this.props.feature}
                            /> 
                        </div>

                        <div class="StickiesColumn">
                            <p class="ColumnTitle">Done</p>
                            <StickiesList 
                                stickies={ filterTasks(this.props.feature.tasks, 3) }
                                columnIdx={3}
                                app={app}
                                feature={this.props.feature}
                            /> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class DevelopPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            selectedFeature: null,
        }
    }

    componentDidMount() {
        const { app } = this.props
        // get projectId from url params
        const  projectId  = this.props.match.params.projectId
        // get project from api
        pullProjectToState(app, projectId)
    }

    submitNewFeatureForm(formData) {
        const { app } = this.props
        const { featureName, featureDescription, tasksStr, } = formData
        const  projectId  = this.props.match.params.projectId
        const userId = app.state.currentUser._id

        // parse tasksStr by \n
        function parseStrByNewline(str) {
            return str.split("\n")
        }
        const tasks = parseStrByNewline(tasksStr).map(text => ( {
            text: text,
            status: 0,
            contributors: [],
            author: userId
        } ))

        // create new feature obj
        const newFeature = {
            description: featureDescription,
            name: featureName,
            tasks: tasks,
            author: userId,
        } 

        // add into project list of features
        const updatedProject = app.state.project
        updatedProject.features.push(newFeature)
        console.log('updatedProject', updatedProject)

        // save
        patchProject(projectId, updatedProject)
        .then(() => pullProjectToState(app, projectId))
    }

    render () {
        const { app } = this.props
        const { currentUser, project } = app.state
        const amIAdmin = project.admins.filter(u => u._id === currentUser._id).length > 0

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

        return (
            <div class='Page'>
                <h1 class="PageTitle">Develop your Project</h1>
                <div id='developProjectPage'>

                    
                    <div class="HorizontalDiv">
                        <h2 class="ProjectName">{project.name}</h2>
                        <AuthorButton author={project.author}/>
                    </div>

                    <br/>
                    <h3>My Role</h3>
                    <p class="MyAdminStatus">I am a{ amIAdmin ? "n Admin" : " Contributer"}</p>
                    <br/>
                    
                    {/* Render list of tasks, click on one to see its features in kanban */}
                    <h3>Completed Features</h3>
                    <ItemList renderItem={feat => (
                        <div class="TaskListButton">
                            <div>
                                {/* name of feature in a button. sets state.selectedFeature */}
                                <button class="DoneFeatureButton"
                                    onClick={() => this.setState({selectedFeature: feat})}
                                >
                                    { feat.name }
                                </button>
                            </div>
                        </div>
                    )
                    } items={project.features.filter(f => f.tasks.filter(t => t.status != 3).length == 0)}/>

                    <br/>
                    {/* Render list of tasks, click on one to see its features in kanban */}
                    <h3>Features In Development</h3>
                    <ItemList renderItem={feat => (
                        <div class="TaskListButton">
                            <div>
                                {/* name of feature in a button. sets state.selectedFeature */}
                                <button class="InDevFeatureButton"
                                    onClick={() => this.setState({selectedFeature: feat})}
                                >
                                    { feat.name }
                                </button>
                            </div>
                        </div>
                    )
                    } items={project.features.filter(f => f.tasks.filter(t => t.status != 3).length > 0)}/>
                    <br/>
                    
                    <h4>Task Kanban</h4>
                    { this.state.selectedFeature ? (
                        <KanbanBoard 
                            feature={ this.state.selectedFeature }
                            userId={user._id}
                            admins={project.admins}
                            app={app}
                        />
                    ) : (<p>Please select a feature</p>)}
                    
                    <br/>
    
                    <h3>Propose New Feature</h3>
                    <NewFeatureForm onSubmit={this.submitNewFeatureForm.bind(this)} />
                    
                    <br/>
                    
                    
                    <div class="HorizontalDiv TeamAdminListDiv">
                        <div class="TeamListDiv">
                            <h3>Team</h3>
                            <p>Team is at {project.team.length}/{project.capacity} capacity </p>
                            <ul>
                                { project.team.map(u => (
                                    <li><AuthorButton author={u}/></li>
                                )) }
                            </ul>
                        </div>
                        <div class="AdminListDiv">
                            <h3>Admins</h3>
                            
                            <ul>
                                { project.admins.map(u => (
                                    <li><AuthorButton author={u}/></li>
                                )) }
                            </ul>

                            
                        </div>
                    </div>
    
                    

                    <br/>

                </div>
            </div> 
        )       
    }
   
    
}

export default DevelopPage;