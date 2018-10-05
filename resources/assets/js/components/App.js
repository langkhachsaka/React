import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route,Link } from 'react-router-dom'
import Create from './Create';
import User from './User';
import Edit from './Edit'
class App extends Component {
    render () {
        return (
            <Router>
                <div>

                <Route exact path='/' component={User} />
                <Route path='/create' component={Create} />
                <Route path='/edit/:id' component={Edit}/>
                </div>

            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
