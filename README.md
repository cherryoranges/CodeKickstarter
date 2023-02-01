# team60
# CodeKickstarter

# Heroku Web App link
https://code-kickstarter-backend.herokuapp.com/

# How to Use

## 1. Login 
Login with User or Admin account
## 2. Browse projects 
View list of projects in infinite list and choose yours to 
## 3. View project
Learn more about a specfic project, its team, its objectives, and how you can help. Then join in!
## 4. Develop project
After joining project, click on Develop to access Development page. Work on existing features and their tasks, and after completing send to admin to approve! And suggest new features with all with an awesome Kanban board!
## 4. Admin vs. User
Users can create features and work on tasks, but project admins have more power! A project admin is the only one able to finalize a Task into DONE in the Kanban board, and, a project admin is only able to DECLINE or APPROVE a Task in the Kaban board! Wonderful!

## 5. Logout!
Logout and all your data is saved! Incredible!


## Login Credentials:

### User
username: user
password: user

## Admin
username: admin
password: admin

## Third-Party Libraries:
- react-router-dom (Provides routing between views)
- react-list  (Provides scrollable list)
- react-loader-spinner (Provides loading animation)

## Example Routes

POST /api/login
{
  username: string,
  password: string
}

Returns
"currentUser": {
    "_id": "61abdf9d3feef83c84fad480",
    "username": "user",
    "password": "$2a$10$0FTo3z9JkM36NjsfSDh0ke73hXB7rHZJ9YDjQpaO4.BxLD/xxIedq",
    "email": "barack.obama@email.com",
    "name": "Barack Obama",
    "picture": "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg",
    "skills": [
        "C",
        "C++",
        "ML"
    ],
    "starred": [],
    "__v": 0
}

POST /api/login
{
  username: string,
  password: string
}

Returns
"currentUser": {
    "_id": "61abdf9d3feef83c84fad480",
    "username": "user",
    "password": "$2a$10$0FTo3z9JkM36NjsfSDh0ke73hXB7rHZJ9YDjQpaO4.BxLD/xxIedq",
    "email": "barack.obama@email.com",
    "name": "Barack Obama",
    "picture": "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg",
    "skills": [
        "C",
        "C++",
        "ML"
    ],
    "starred": [],
    "__v": 0
}

GET /api/projects

Returns [
  list of projects
]

GET /api/projects/:projectId

Returns {
    "_id": "61afcf3cd52497182ae26a1f",
    "name": "Test Project 0",
    "author": User,
    "description": "Lorem ipsm",
    "image": "https://picsum.photos/600/300",
    "skills": [
        "C",
        "Java"
    ],
    "capacity": 2,
    "team": [
        User, 
    ],
    "admins": [
        User
    ],
    "features": [
        {
            "name": "Feature Uno",
            "author": "61afcf3bd52497182ae26a1b",
            "description": "Lorem ipsum",
            "tasks": [
                {
                    "text": "Task Uno",
                    "status": 0,
                    "author": "61afcf3bd52497182ae26a1b",
                    "contributors": [],
                    "_id": "61afcf3cd52497182ae26a21"
                },
                {
                    "text": "Task Dos",
                    "status": 1,
                    "author": "61afcf3bd52497182ae26a1b",
                    "contributors": [
                        "61afcf3bd52497182ae26a1b"
                    ],
                    "_id": "61afcf3cd52497182ae26a22"
                },
                {
                    "text": "Test Tres",
                    "status": 2,
                    "author": "61afcf3bd52497182ae26a1b",
                    "contributors": [
                        "61afcf3bd52497182ae26a1b"
                    ],
                    "_id": "61afcf3cd52497182ae26a23"
                },
                {
                    "text": "Test Quatro",
                    "status": 3,
                    "author": "61afcf3bd52497182ae26a1b",
                    "contributors": [
                        "61afcf3bd52497182ae26a1b"
                    ],
                    "_id": "61afcf3cd52497182ae26a24"
                }
            ],
            "_id": "61afcf3cd52497182ae26a20"
        },
        {
            "name": "Feature Dos",
            "author": "61afcf3bd52497182ae26a1b",
            "description": "Lorem ipsum",
            "tasks": [
                {
                    "text": "Task Dos",
                    "status": 3,
                    "author": "61afcf3bd52497182ae26a1b",
                    "contributors": [
                        "61afcf3bd52497182ae26a1b"
                    ],
                    "_id": "61afcf3cd52497182ae26a26"
                },
                {
                    "text": "Test Tres",
                    "status": 3,
                    "author": "61afcf3bd52497182ae26a1b",
                    "contributors": [
                        "61afcf3bd52497182ae26a1b"
                    ],
                    "_id": "61afcf3cd52497182ae26a27"
                },
                {
                    "text": "Test Quatro",
                    "status": 3,
                    "author": "61afcf3bd52497182ae26a1b",
                    "contributors": [
                        "61afcf3bd52497182ae26a1b"
                    ],
                    "_id": "61afcf3cd52497182ae26a28"
                }
            ],
            "_id": "61afcf3cd52497182ae26a25"
        }
    ],
    "isFinished": false,
    "__v": 0
}

POST /api/projects
{
  name: string,
  author: ObjectId,
  description: string,
  image: strng,
  skills: [string],
  capacity: integer
  team: [ObjectId]
  admins: [ObjectId]
}

Returns  
  created project


PATCH /api/projects/{{projectId}}/features/{{featureId}}/tasks/{{taskId}}
{
  text: string,
  status: number,
  author: ObjectId,
  contributors: [ObjectId]
}

Returns  
  Patched task
