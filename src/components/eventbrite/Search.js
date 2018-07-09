import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import eventbrite from 'eventbrite';
import * as sdk_token from '../../constants/search_sdk';

// Create configured Eventbrite SDK
const sdk = eventbrite({token: sdk_token.SDK_TOKEN});
// let response = '';
// // See: https://www.eventbrite.com/developer/v3/endpoints/users/#ebapi-get-users-id

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            latitude: 0,
            longitude: 0,
            description: '',
            searchInput: 'Hello'
        }
        this.updateInput = this.updateInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoMethod = this.demoMethod.bind(this);
        this.getMapMarkerCoords = this.getMapMarkerCoords.bind(this);
    }

    componentDidMount() {
        this.getMapMarkerCoords();
    }
    getMapMarkerCoords(){
        sdk.request(`/events/search/?expand=venue`)
            .then(res => {
                console.log(res)
                this.setState({
                    response: res
                });
                for (let i = 0; i < res.events.length; i++) {
                    if (res.events[i].name.text.includes(this.state.searchInput)) {
                        this.setState({
                            response: res,
                            latitude: res.events[i].venue.latitude,
                            longitude: res.events[i].venue.longitude,
                            description: res.events[i].description.text
                        });
                        console.log('Includes', i);
                        console.log(res.events[i].venue.latitude);
                        console.log(res.events[i].venue.longitude);
                        this.demoMethod(this.state.latitude, this.state.longitude);
                        return;
                    } else {
                        this.setState({
                            response: res,
                            latitude: 0,
                            longitude: 0,
                            description: ''
                        });
                        this.demoMethod(this.state.latitude, this.state.longitude);
                    }
                }
            });
    }

    demoMethod(lat, lng) {
        this.props.sendData(lat, lng);
    }
    updateInput(event){
        this.setState({searchInput : event.target.value})
        this.getMapMarkerCoords();
    }


    handleSubmit(){
        console.log('Your input value is: ' + this.state.searchInput);

    }

    render() {
        return (
            <div>
                {/*{this.demoMethod(this.state.latitude, this.state.longitude)}*/}
               {/*<div>*/}
                    {/*<input type="text" onChange={this.updateInput} />*/}
                    {/*<button type="submit" onClick={this.handleSubmit} >Search</button>*/}
                {/*</div>*/}

                {/*<form onSubmit={this.handleSubmit}>*/}
                    <label>
                        Name:
                        <input type="text" onChange={this.updateInput} />
                    </label>
                <TextField
                    id="search"
                    label="Search field"
                    type="search"
                    margin="normal"
                />
                    {/*<input type="submit" value="Submit" onClick={this.handleSubmit}/>*/}
                {/*</form>*/}

                <div>
                <Paper  elevation={1}>
                    <Typography variant="headline" component="h3">
                        <p>{this.state.description}</p>
                    </Typography>
                </Paper>
            </div>
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

