
import React from 'react';
import './AccountPage.css'

import {SelectedItemList} from '../Default/Filter'

class AccountPage extends React.Component  {
  // componentDidMount() {
  //   const {app} = this.props
  //   pullUserToState(app.state.currentUser._id, app)
  // }

  render() {
    const {app} = this.props
    const user = app.state.currentUser

    return (
      <div class="Page">
        <h1 class="PageTitle">My Account</h1>
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

export default AccountPage;



