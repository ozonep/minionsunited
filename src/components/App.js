import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import {auth} from '../firebase';
import Welcome from './Welcome/Welcome';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';
import NavBar from './Nav/Nav';
import Chat from './Chat/Chat';
import People from './Users/Users';

class App extends Component {
    state = {
        user: null
    };
    componentWillMount() {
        auth.onAuthStateChanged((user) => {
            // setTimeout(() => { this.setState({user}) }, 1000);
            this.setState({user});
        });
    }
    render() {
        return (
            <Router>
                <div className="container">
                    {this.state.user ? <NavBar uid={this.state.user.uid}/> : null}
                    <Switch>
                        <Route exact path="/" render={() => this.state.user ? <Redirect to="/feed"/> : <Redirect to="/welcome"/>}/>
                        <Route path="/welcome" render={() => this.state.user ? <Redirect to="/"/> : <Welcome/>}/>
                        <Route exact path="/feed" render={() => this.state.user ? <Feed/> : <Redirect to="/welcome"/>}/>
                        <Route path='/profile' render={() => this.state.user ? <Profile uid={this.state.user.uid}/> : <Redirect to="/welcome"/>}/>
                        <Route exact path='/users' render={() => this.state.user ? <People user={this.state.user}/> : <Redirect to="/welcome"/>}/>
                        <Route path='/chat' render={() => this.state.user ? <Chat uid={this.state.user.uid}/> : <Redirect to="/welcome"/>}/>
                        <Route render={() => <p>Not found</p>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

