
import React from 'react';
import './AccountPage.css'

import {SelectedItemList} from '../Default/Filter'
import { getUser } from '../../actions/user';
import Loader from "react-loader-spinner";

class LookupUserPage extends React.Component  {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }
    
  componentDidMount() {
    const userId = this.props.match.params.userId
    
    getUser(userId).then(user => this.setState({user: user}))
  }

  render() {
    const user = this.state.user

     // Show loading indicator on fetch call
     const isLoading = user === null 

       
       
     if (isLoading) {
         return (
             <div class='Page'>
                 <h1 class="PageTitle">Project Info</h1>
                 <Loader
                     type="Puff"
                     color="#00BFFF"
                     height={'100%'}
                     width={'100%'}
                 />
             </div>
         )
     }

    return (
      <div class="Page">
        <h1 class="PageTitle">Lookup User</h1>
        <div id="accountPage">

          

          <div class="AccountDetailsDiv">
            <h3>Name</h3>
            <h2>{user.name}</h2>
            <br/>

            <h3>Username</h3>
            <h2>{user.username}</h2>
            <br/>

            <div class="ProfilePictureDiv">
            <h3>Image</h3>
            <img
              height={"300px"}
              src={user.picture}
              alt="ProfilePicture"
              class="ProfilePicture"
            />
          </div>

            <h3>Email</h3>
            <h2>{user.email}</h2>
            <br/>

            <h3>Skills:</h3>
            <SelectedItemList itemList={user.skills} selectedItems={[]}/>
            <br/>


          </div>

          
        </div>
        
    </div>
        );
    }
}

export default LookupUserPage;


