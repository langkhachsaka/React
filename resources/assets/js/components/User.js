import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class User extends Component{
    constructor(){
        super();
        this.state={
            data: []
        }
    }
    componentWillMount(){
        let $this = this;
        axios.get('/api/users').then(response => {
            this.setState({
                data : response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }
    deleteUser(user){
        console.log(user)
        const newState =this.state.data.slice();
        newState.slice(newState.indexOf(user),1)
        this.setState({
            data: newState
        })
    }
    render(){
        return (
        	<div className="container">
        	<h2>List User</h2>
            <a href="/users/create" className="btn btn-primary">Add User</a>
        		<table className="table table-hover">
        			<thead>
        				<tr>
        					<th>Id</th>
        					<th>Name</th>
        					<th>Email</th>
        					<th>Action</th>
        				</tr>
        			</thead>
        			<tbody>
                    {this.state.data.map((user,i)=> (
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <a href="" className="btn btn-primary">Edit</a>||
                                <a href="javascript:;" className="btn btn-danger" onClick={this.deleteUser.bind(this,user)}>Delete</a>
                            </td>
                        </tr>
                        )
                        )}
        				
        			</tbody>
        		</table>
        		</div>
        	);
      }
    }

if (document.getElementById('app')) {
    ReactDOM.render(<User/>,document.getElementById('app'));
}

