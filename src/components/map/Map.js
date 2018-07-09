import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from '../eventbrite/Search';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.state = {
            newLat: 0,
            newLong: 0
        };
    }

    getData(lat, long) {
        this.setState({
            newLat: lat,
            newLong: long
        });

        console.log("Get Data", lat, long);
    }

    render() {
        const style = {
            width: '60%',
            height: '60%'
        };

        return (
            <div>
                <Search sendData={this.getData}/>
                <Map
                    google={this.props.google}
                    style={style}
                    initialCenter={{
                         lat: 0,
                         lng: 0
                     }}
                    zoom={2}>

                    <Marker
                        // name={'Dolores park'}
                        position={{
                            lat: this.state.newLat,
                            lng: this.state.newLong}}/>
                    <Marker/>
                </Map>

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCS3zUSs-C1osAe2pihSe36MNQgOyTvJNI',
    v: 3
})(MapContainer)