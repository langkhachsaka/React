import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Create extends Component{
    constructor(){
        super();
        this.state={
            name: '',
            email: '',
            password: '',
        }
    }
    handleNameChange(e){
        this.setState({
            name: e.target.value
        })
    }
     handleEmailChange(e){
        this.setState({
            email: e.target.value
        })
    }
     handlePasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }
    handSubmit(e){
        e.preventDefault();
        console.log(this.state)

        axios.post('/api/users',this.state).then(response => {
            console.log(response)
        }).then(error => {
            console.log(error)
            })
    }

    render(){
        return (
            <div className="container">
            <h2>Add User</h2>
        	<form className="form-horizontal" onSubmit={this.handSubmit.bind(this)}>
                <div className="form-group">
                    <label  className="control-label col-sm-2" htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name"  name="name" value={this.state.name} onChange={this.handleNameChange.bind(this)} placeholder="Enter Name"/>
                </div>
                <div className="form-group">
                    <label  className="control-label col-sm-2" htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email"  name="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)}placeholder="Enter Email"/>
                </div>
                <div className="form-group">
                    <label  className="control-label col-sm-2" htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password"  name="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}placeholder="Enter Password"/>
                </div>
            
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
            </div>
        	);
      }
    }

if (document.getElementById('create')) {
   ReactDOM.render(<Create/>,document.getElementById('create'));
}
