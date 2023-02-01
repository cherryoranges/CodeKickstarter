import PropTypes from 'prop-types'

import { SelectedItemList } from '../Default/Filter'
import { StarredIcon,  } from '../Default/Buttons'


import './Projects.css'
import { starProject } from '../../actions/user'
import { withRouter } from 'react-router-dom'


function authorButton(props) {
const author = props.author
if (author===null) {
    return null
}
const {name, picture, _id} = props.author
return (
        <div 
            class="AuthorButtonDiv"
            onClick={() =>{
                props.history.push(`/lookup-user/${_id}`)
             }}
            >
            <div>
                <p>{name}</p>
            </div>
            <img class={"Circle"} src={picture} height={50} width={50}/>
        </div>
    )
}
export const AuthorButton = withRouter(authorButton)


// project view component is a visual button component representing a specific project 
function ProjectView ({onStar, buttons, projectImage, projectName, projectAuthor, projectDescription, projectSkills, mySkills, isStarred }) {
    return (
        <div class="ProjectView">
            <div class="LayeredDiv">
                <img height={150} width={300} src={projectImage} />

                <div class="StarIconDiv">
                    <StarredIcon onClick={onStar} isSelected={isStarred}/>
                </div>
            </div>

            <div>
                <p class="ProjectName">{ projectName }</p>
                <p class="ProjectDescription"> {projectDescription} </p>
                <p class="LabelText">Need skills: </p>
                <SelectedItemList itemList={projectSkills} selectedItems={mySkills}/>
            </div>
            
            <br/>
            <div>
                <AuthorButton author={projectAuthor} />
            </div>
            
            <br/>

            { buttons }
        </div>
    )
}

// document props
ProjectView.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.element),
    projectImage: PropTypes.string,
    projectName: PropTypes.string,
    projectSkills: PropTypes.arrayOf(PropTypes.string),
    projectAuthorPicture: PropTypes.string,
    projectAuthor: PropTypes.string,
    mySkills: PropTypes.arrayOf(PropTypes.string),
    isStarred: PropTypes.bool,
}

export default ProjectView;