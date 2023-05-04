import React from 'react'
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';


const containerStyle = {
    width: '75vw',
    height: '60vh' 
};

const center = {
    lat: 34.052235, 
    lng: -118.243683 
};

const options ={
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    styles: [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }]
        }
    ]
};

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })

    const testMarker = {
        lat: 34.2407,
        lng: -118.5300
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={11}
            options={options}
        >
        <Marker position = {testMarker} />
        <></>
        </GoogleMap>
    ) : <></>
    }

export default Map
