import React from  'react'
import PropTypes from 'prop-types'

// import styles
import './Buttons.css'

// NOTE: no default export

export function CircleButton ({ text }) {
    return (
        <button class="Circle">{ text }</button>
    )
}


export function StarredIcon({isSelected, onClick}) {
    const selectedStar = <img src={"/star-icon/star-selected.png"} height={100} width={50}/>
    const unselectedStar = <img src={"/star-icon/star-unselected.png"} height={100} width={50}/>

    return (
        <a onClick={onClick}>
            { isSelected ? selectedStar : unselectedStar }
        </a>
    )

}

StarredIcon.propTypes = {
    isSelected: PropTypes.bool,
}

export function TextButton(props) {
    return (
        <div class="TextButtonDiv">
           
                <p>{props.children}</p>

        </div>
    )
}