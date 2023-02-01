export class Feature {
    constructor(name, description, tasks) {
        this.name = name
        this.description = description
        this.tasks = tasks
    }
}

export class Project {
    constructor(name, author, description, image, skills, capacity, team, admins, features, isFinished) {
        this.name = name
        this.author = author
        this.description = description
        this.image = image
        this.skills = skills
        this.capacity = capacity
        this.team = team
        this.admins = admins
        this.features = features
        this.isFinished = isFinished
    }

    addFeature(feature) {
        this.features.push(feature)
    }
}

export class User {
    constructor(name, username, email, picture, skills, starred) {
        this.name = name
        this.username = username
        this.email = email
        this.picture = picture
        this.skills = skills
        this.starred = starred
    }
}

export class Task {
    constructor(text, status, contributors) {
        this.text = text
        this.status = status
        this.contributors = contributors
    }

    updateStatus(newStatus) {
        this.status = newStatus
    }

    addContributor(username) {
        this.contributors.push(username)
    }

    removeContributor(username) {
        this.contributors = this.contributors.filter(c => c !== username)
    }
}

export const DEFAULT_TASKS = [ 
    new Task("Get milk", 0, []),
    new Task("Get bread", 1, ["@boris"]),
    new Task("Get cereal", 1, ["@frank"]),
    new Task("Get yogurt", 2, ["@steve"]),
    new Task("Get cheese", 3, ["@joeDylan"]),
]

export const DEFAULT_FINISHED_TASKS = [ 
    new Task("Get milk", 3, ["@joeDylan"]),
    new Task("Get bread", 3, ["@boris"]),
    new Task("Get cereal", 3, ["@frank"]),
    new Task("Get yogurt", 3, ["@steve"]),
    new Task("Get cheese", 3, ["@joeDylan"]),
]

export const DEFAULT_FEATURE = new Feature(
    "Add SQL Database",
    "Create SQL database instance and connect to backend.",
    DEFAULT_TASKS,
)

export const DEFAULT_FEATURE_TWO = new Feature(
    "Create Web UI",
    "Draw up ui sketches",
    DEFAULT_FINISHED_TASKS,
)

export const DEFAULT_PROJECT = new Project(
    "Web-App Project", 
    "@joeDylan", 
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    "https://s.yimg.com/ny/api/res/1.2/qUvOFhYxj7HpXlOCmF0aeQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTYzNC44/https://s.yimg.com/hz/images/CA_AHTTP_REUTERS_OLCABUS_WRAPPER_H_NEW/2018-06-20T012809Z_2_LYNXMPEE5I27P-OCABS_RTROPTP_3_CBUSINESS-US-JAPAN-CODING-BOOTCAMP_original.jpg",
    ["Java", "C", "CSS", "Python"], 
    5,
    ["@joeDylan", "@frankBones", "@richard54", "@joeSmith"], 
    ["@joeDylan"], 
    [ DEFAULT_FEATURE, DEFAULT_FEATURE_TWO ]
)

export const SKILLS_LIST = [
    'C', 'C++', 'Java', 'Python',
    'WebDev', 'BackDev', 'Game Design',
    'Databases','SQL', 'JavaScript', 'Data Science'
]

export const DEFAULT_USER =  new User(
    "Joe Dylan", 
    "@joeDylan", 
    "joesmith@email.com", 
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg", 
    ["C", "Python"], 
    []
    )

