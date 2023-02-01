import React from 'react'
import './HomePage.css'


import { PageSwitcherButton } from '../Navigation/NavBar'
import { withRouter } from 'react-router-dom'


function HomePage (props) {

    return (
        <div class='Page'>

            <div id='homePage'>

                <h1>Where software projects find their crew</h1>
                <p>Great software needs great people to make it happen. Find the right mates for the job and make it happen.</p>

                <div class="HorizontalDiv">
                    <button class="LoginButton"
                        onClick={() => {
                            props.history.push(`/login`)
                        }}>
                        Login        
                    </button>
                    <button class="RegisterButton"
                    onClick={() => {
                        props.history.push(`/register`)
                    }}>
                        Sign up       
                    </button>
                </div>

                <img 
                    src="https://media2.giphy.com/media/u2pmTWUi0MXjyrMaVj/giphy.gif?cid=ecf05e47qa6hgwtapttcdiicvqn2j9q0hvz5kapf6pf4vi8i&rid=giphy.gif&ct=g"
                    class={"Img-Max-Fit"}
                />
             
            </div>
        </div>
    )
}

export default withRouter(HomePage);