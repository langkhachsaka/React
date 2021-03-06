import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'


class Create extends Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            email: '',
            password: '',

        }
        this.handSubmit = this.handSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handSubmit(e){
        e.preventDefault();
        axios.post('/api/users',this.state).then(response => {
            console.log(response)
            this.props.history.push('/');
        }).then(error => {
            console.log(error)
            })
    }

    render(){
        return (
            <div className="container">
           <center><h2>Add User</h2></center>

        	<form className="form-horizontal" onSubmit={this.handSubmit}>
                <div className="form-group">
                    <label  className="control-label col-sm-2" htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name"  name="name" value={this.state.name} onChange={this.handleOnChange} placeholder="Enter Name"/>
                </div>
                <div className="form-group">
                    <label  className="control-label col-sm-2" htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email"  name="email" value={this.state.email} onChange={this.handleOnChange} placeholder="Enter Email"/>
                </div>
                <div className="form-group">
                    <label  className="control-label col-sm-2" htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password"  name="password" value={this.state.password} onChange={this.handleOnChange} placeholder="Enter Password"/>
                </div>

                <button type="submit" className="btn btn-primary" >Add</button>&nbsp;
                <Link to="/" className="btn btn-primary">List Users</Link>
            </form>

            </div>
        	);
      }
    }
export default Create;
