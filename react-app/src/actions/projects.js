// environment configutations
import { GET, PATCH, POST } from './http'
import ENV from '../config.js'

const API_HOST = ENV.api_host



// get a list of projects
export const getProjects = async () => {
    const url = `${API_HOST}/api/projects`
    return GET(url)
}

export const pullProjectsToState = async (app) => {
    try {
        const projects = await getProjects()
        app.setState({projects: projects})

        return projects

    } catch (error) {
        app.setState({error: error})

        throw error
    }
}
  

// get a single project
export const pullProjectToState = async (app, projectId) => {
    try {
        const project = await getProject(projectId)
        app.setState({project: project})
        return project

    } catch (error) {
        app.setState({error: error})
        throw error
    }
}

export const getProject = async (projectId) => {
    const url = `${API_HOST}/api/projects/${projectId}`
    return GET(url)
}

export const patchProject = async (projectId, project) => {
    const url = `${API_HOST}/api/projects/${projectId}`
    return PATCH(url, project)
}

export const postProject = async (project) => {
    const url = `${API_HOST}/api/projects`
    return POST(url, project)
}



export const toggleTeamMember = async (projectId, userId) => {
    try {
        const project = await getProject(projectId)

        // update project.team and patch
        if (project.team.filter(u => u._id === userId).length > 0) {
            console.log('removing')
            // on team => take off
            project.team = project.team.filter(u => u._id !== userId)

        } else {
            console.log('adding')
            project.team.push(userId)
        }


        return await patchProject(projectId, project)

    } catch (error) {
        console.log(error);
        throw error
    }
}