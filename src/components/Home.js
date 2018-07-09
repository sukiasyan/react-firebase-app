import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from './withAuthorization';
import {db} from '../firebase';
import MapContainer from './map/Map';


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
        };
    }

    componentDidMount() {
        const { onSetUsers } = this.props;
        db.onceGetUsers().then(snapshot =>
            onSetUsers(snapshot.val())
        );
    }

    render() {
        return (
            <div>
                <h1>Event Search Page</h1>
                <p>Accessible by every signed in user.</p>

                <MapContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.userState.users,
});

const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
)(HomePage);