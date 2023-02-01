import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CircleButton, TextButton } from '../Default/Buttons'
import { AppLogo } from '../Default/Images'
import AuthenticationButton  from '../Auth/AuthenticationButton.js'
import './NavBar.css'



// Navigates to any page nested within PageSwitcher
export function PageSwitcherButton({toRoute, children}) {
    return (
        <div class={"PageSwitcherButton"}>
            <Link to={toRoute} style={{textDecoration: 'none', }}>
                { children }
            </Link>
        </div>
    )
}


// Links toRoute and navigates toRoute onClick using PageSwitcher
function NavBarButton({ toRoute, text }) {
    return (
        <div class="NavBarButton">
            <PageSwitcherButton  toRoute={ toRoute }>
                <TextButton>{text}</TextButton>
            </PageSwitcherButton>
        </div>
)
}

// Navigation bar with buttons for switching between Pages in PageSwitcher

function NavBar (props) {
    const { app, isAuthenticated, onLogin, onLogout } = props

    

    return (

        <div id='navBar'>
            <AppLogo/>
            

            {isAuthenticated ? (
                <div class={"HorizontalDiv"}>
                    <NavBarButton toRoute={'/'} text={"Home"}/>
                    <NavBarButton toRoute={'/browse'} text={"Browse"}/>
                    <NavBarButton toRoute={'/launch'} text={"Launch"}/>
                    <NavBarButton toRoute={'/active'} text={"Active"}/>
                    <NavBarButton toRoute={'/settings'} text={"Account"}/>
                </div>
            ):  null
            }
            <AuthenticationButton onLogin={onLogin} onLogout={onLogout} isAuthenticated={isAuthenticated} app={app}/>
           
            </div>

       )
}

export default NavBar;