import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import eventbrite from 'eventbrite';
import * as sdk_token from '../../constants/search_sdk';

// Create configured Eventbrite SDK
const sdk = eventbrite({token: sdk_token.SDK_TOKEN});
// let response = '';
const paperStyle = {
    padding: "10px"
};
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            latitude: 0,
            longitude: 0,
            description: '',
            searchInput: 'Hello'
        };
        this.updateInput = this.updateInput.bind(this);
        this.demoMethod = this.demoMethod.bind(this);
        this.getMapMarkerCoords = this.getMapMarkerCoords.bind(this);
    }

    componentDidMount() {
        this.getMapMarkerCoords();
    }
    getMapMarkerCoords(){
        sdk.request(`/events/search/?expand=venue`)
            .then(res => {
                // console.log(res)
                this.setState({
                    response: res
                });
                for (let i = 0; i < res.events.length; i++) {
                    if (res.events[i].name.text.includes(this.state.searchInput) && this.state.searchInput !== '') {
                        this.setState({
                            response: res,
                            latitude: res.events[i].venue.latitude,
                            longitude: res.events[i].venue.longitude,
                            description: res.events[i].description.text
                        });
                        // console.log('Includes', i);
                        // console.log(res.events[i].venue.latitude);
                        // console.log(res.events[i].venue.longitude);
                        this.demoMethod(this.state.latitude, this.state.longitude);
                        return;
                    } else {
                        this.setState({
                            response: '',
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

    render() {
        return (
            <div className="form-group">
                <form >
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Type to search" onChange={this.updateInput}/>
                </form>

                <div>
                    <br/>
                <Paper  elevation={1} style={this.state.description ? paperStyle : null}>
                    <Typography variant="headline" component="h3">
                        <p className="paper-content">{this.state.description}</p>
                    </Typography>
                </Paper><br/>
                </div>
            </div>
        )
    }

}

export default Search;

