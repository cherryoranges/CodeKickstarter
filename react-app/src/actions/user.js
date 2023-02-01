  // Functions to help with user actions.

// environment configutations
import ENV from '../config.js'
import { POST } from './http.js';
const API_HOST = ENV.api_host

// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    const url = `${API_HOST}/api/check-session`;

    fetch(url)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
    })
    .then(json => {
        if (json && json.currentUser) {
            app.setState({ currentUser: json.currentUser });
        }
    })
    .catch(error => {
        console.log(error);
    });
    
};

// A function to send a POST request with the user to be logged in
 export const login = ({ username, password }, app) => {

    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/api/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
            else {
                throw new Error("Login failed")
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser, error: null });
            }
        })
        .catch(error => {
            console.log(error)
            app.setState({ error: error.message, });
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = `${API_HOST}/api/logout`;
    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
                error: null,
            });
        })
        .catch(error => {
            app.setState({ error: error, });
        });
};

export const didUserStarProject = (user, projectId) => {
    try {
        return user.starred.filter(p => p._id === projectId).length > 0        
    
    } catch(error) {
        console.log(error)
        throw error
    }
}

export const isUserOnProjectTeam = (userId, project) => {
    try {
        return project.team.filter(u => u._id === userId).length > 0        
    
    } catch(error) {
        console.log(error)
        throw error
    }
}

export const isUserProjectAdmin = (userId, project) => {
    try {
        return project.admins.filter(u => u._id === userId).length > 0        
    
    } catch(error) {
        console.log(error)
        throw error
    }
}

export const pullUserToState = async(userId, app) => {
    try {
        const user = await getUser(userId)
        
        app.setState({currentUser: user})
        return user

    } catch (error) {
        console.log(error)
        app.setState({error: error})
        throw error
    }
}

export const getUser = async (userId) => {
    const url = `${API_HOST}/api/users/${userId}`

    const res = await fetch(url)

    if (!res.ok) {
        const message = `An error has occurred: ${res.status}`
        throw new Error(message)
    }

    if (res.status === 200) {
        const obj = await res.json()
        return obj
    }
}

export const postUser = async (user) => {
    const url = `${API_HOST}/api/users`
    return POST(url, user)
}

export const patchUser = async (userId, user) => {
    const url = `${API_HOST}/api/users/${userId}`

     const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    const res = await fetch(request)

    if (!res.ok) {
        const message = `An error has occurred: ${res.status}`
        throw new Error(message)
    }

    if (res.status === 200) {
        const obj = await res.json()
        return obj
    }
}

export const starProject = async (projectId, userId) => {
    try {
        // get user obj
        const user = await getUser(userId)

        // add or remove projectId into starred array property of user
        let wasStarred = false 
        for (let i=0; i<user.starred.length; i++) {
            if (user.starred[i]._id === projectId) { // already starred
                user.starred.splice(i, 1)
                wasStarred = true
                break
            }
        }
        if (!wasStarred) {
            user.starred.push(projectId)
        }


        // patch updated user
        return await patchUser(userId, user)
        
      

    } catch (error) {
        console.log(error)
        throw error
    }
}

