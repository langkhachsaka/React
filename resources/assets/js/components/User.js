import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route,Link } from 'react-router-dom';

import Create from './Create';
import './table.css';

class User extends Component{
    constructor(){
        super();
        this.state={
            data: [],
            url : '/api/users',
            pagination : [],

        };
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }
    componentWillMount(){
       this.fetchUsers()
    }
    fetchUsers(){
        let $this = this;
        axios.get(this.state.url).then(response => {
            //console.log(response.data);
            this.setState({
                data : $this.state.data.length > 0 ?  $this.state.data.concat(response.data.data) :response.data.data,
                url : response.data.next_page_url
            })
            $this.makePagination(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    makePagination(data){
        let pagination ={
            current_page: data.current_page,
            last_page : data.last_page,
            next_page_url : data.next_page_url,
            prev_page_url : data.prev_page_url
        }
        this.setState({
            pagination : pagination
        })
    }
    loadMore(){
        this.setState({
            url :  this.state.pagination.next_page_url
        })
        this.componentWillMount()
    }

    render(){
        return (

        	<div className="container">
        	    <center><h2>List Users</h2></center>
                <div>
                        <Link to="/create" className="btn btn-primary">Add User</Link>
                </div>
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
                            <UserRow key={i} i={i} user={user} object={this} />
                        )
                        )}

        			</tbody>

        		</table>

                <button className="btn btn-default" onClick={this.loadMore.bind(this)}>LoadMore</button>
        	</div>
        	)
      }
    }

    class UserRow extends Component{

        deleteUser(user,object){
            console.log(user)

            var $this=object
            axios.delete('/api/users/'+user.id).then(response => {
                console.log(response)
                const newState =$this.state.data.slice();
                newState.splice(newState.indexOf(user),1)
                $this.setState({
                     data: newState
            })
        }).catch(error=>{
                console.log(error)
        })

        }

        render(){
            const id = this.props.user.id;
            return (
                <tr key={this.props.i}>
                    <td>{this.props.user.id}</td>
                    <td>{this.props.user.name}</td>
                    <td>{this.props.user.email}</td>
                    <td>
                        <Link to={{pathname: '/edit/'+id}} className="btn btn-primary">Edit</Link>
                        <a href="javascript:;" className="btn btn-danger" onClick={this.deleteUser.bind(this, this.props.user,this.props.object)}>Delete</a>
                    </td>
                </tr>
            )
        }
    }

    export default User;
