import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import { firebase } from '../firebase';
import withAuthentication from './withAuthentication';
import Navigation from './Navigation';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';


import * as routes from '../constants/routes';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }
    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState(() => ({ authUser }))
                : this.setState(() => ({ authUser: null }));
        });
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <Navigation authUser={this.state.authUser}/>

                    <hr/>

                    <Route
                        exact path={routes.SIGN_UP}
                        component={() => <SignUpPage/>}
                    />
                    <Route
                        exact path={routes.SIGN_IN}
                        component={() => <SignInPage/>}
                    />
                    <Route
                        exact path={routes.PASSWORD_FORGET}
                        component={() => <PasswordForgetPage/>}
                    />
                    <Route
                        exact path={routes.HOME}
                        component={() => <HomePage/>}
                    />
                </div>
            </Router>
        );
    }
}
export default withAuthentication(App);
