import React from 'react'
import PropTypes from 'prop-types'

import './Filter.css'

function SelectedItem({text}) {
    return (
        <div class="SelectedItem">
            { text }
        </div>
    )
}

function UnselectedItem({text}) {
    return (
        <div class="UnselectedItem">
            { text }
        </div>
    )
}

// component renders items in itemList, highlighting selectedItems
export function SelectedItemList({itemList, selectedItems}) {
    return (
        <div class="SelectedItemList">
            { itemList.map(item => {

                if (selectedItems.includes(item)) {
                    // render highlighted selected item
                    return <SelectedItem text={item}/>
                } else {
                    return <UnselectedItem text={item}/>
                }
            })}
        </div>
    )
} 

SelectedItemList.propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.string),
    selectedItems: PropTypes.arrayOf(PropTypes.string)
}