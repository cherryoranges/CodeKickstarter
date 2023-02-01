import './Images.css'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

function appLogo(props) {
    return (
        <div 
            class="AppLogo"
            onClick={() => {
                props.history.push('/')
            }}
        >
            
            <img
                src={"codekickstarter-logo.png"}
                width={400}
            ></img>

        </div>
    )
}
export const AppLogo = withRouter(appLogo)
