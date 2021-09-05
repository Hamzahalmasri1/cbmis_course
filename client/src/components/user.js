
import React,{Component} from 'react';

class Users extends Component{
   
    constructor(){
        super();
            this.state = {
                users: [],

            }   


    }


componentDidMount(){
    this.callBackendAPI()
      .then(res => this.setState({ users:res}, console.log(res)))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('http://localhost:4000/api/users');
  
    const body = await response.json();
   
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
}
    render(){ return (<div><h5>
            <ul>
                {this.state.users.map(user =>
                <li key = {user.phone} >{user.username} - {user.email} - {user.phone} -  {user.gender}</li>
                )}
                
            </ul>
        
        </h5></div>);}

}


export default Users;
