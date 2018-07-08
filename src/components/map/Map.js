import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// const google = window.google;
export class MapContainer extends Component {
    render() {
        const style = {
            width: '80%',
            height: '100%'
        };
        return (
            <Map
                google={this.props.google}
                style={style}
                initialCenter={{
                     lat: 40.854885,
                     lng: -88.081807
                 }}
                 zoom={3}
                 onClick={this.onMapClicked}>

                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: 37.778519, lng: -122.405640}} />
                <Marker
                    name={'Dolores park'}
                    position={{lat: 0, lng: 0}} />
                <Marker />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        {/*<h1>{this.state.selectedPlace.name}</h1>*/}
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCS3zUSs-C1osAe2pihSe36MNQgOyTvJNI'
})(MapContainer)