import React, {Component} from 'react';
import eventbrite from 'eventbrite';
import * as sdk_token from '../../constants/search_sdk';

// Create configured Eventbrite SDK
const sdk = eventbrite({token: sdk_token.SDK_TOKEN, q: 'React'});
// let response = '';
// // See: https://www.eventbrite.com/developer/v3/endpoints/users/#ebapi-get-users-id
let q="React";

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: '',
        };
    }
    componentDidMount() {
        sdk.request(`/events/search/?token=${sdk.token}&q=${sdk.q}&expand=venue`).then(res => {
            this.setState({response:  res});
            console.log(this.state.response);
            console.log(res.events[0].venue.latitude);
            // console.log(res.events[0].venue.longitude);
            console.log(res.events[0].q);


        });
    }
    render() {
    return (
        <div>
            {/*{this.state.response.pagination.events[0]}*/}
        </div>
    )
}

}
export default Search;

//
// var event = require('search-eventbrite');
//
// event.getAll({
//     q: 'Founder Institute Information Session',
//     'location.address':'Yerevan',
//     sort_by: 'date'
// }, function(err, res, events){
//     if(err) return console.log('err: ', err);
//     console.log('events: ', events)
//     // console.log('events: ', events[1].venue)
// });

