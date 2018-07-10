import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


const Navigation = ({authUser}) =>
    <div>
        {authUser
            ? <NavigationAuth/>
            : <NavigationNonAuth/>
        }
    </div>

const NavigationAuth = () =>

    <MuiThemeProvider>
        <AppBar
            title="Eventbrite find your next experience"
            style={{backgroundColor: "grey"}}
            iconElementRight={<div><SignOutButton/></div>}
        >
        </AppBar>
    </MuiThemeProvider>

const NavigationNonAuth = () => (
    <MuiThemeProvider>
        <AppBar
            title="Eventbrite find your next experience"
            style={{backgroundColor: "grey"}}

            iconElementRight={<div><FlatButton style={{color: "white"}} label="Sign In" href={routes.SIGN_IN}/>
                <FlatButton style={{color: "white"}} label="Sign Up" href={routes.SIGN_UP}/></div>}
        >
            {/*<Link to={routes.SIGN_UP}>Sign Up</Link>*/}
            {/*<Link to={routes.SIGN_IN}>Sign In</Link>*/}
        </AppBar>
    </MuiThemeProvider>

);

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);