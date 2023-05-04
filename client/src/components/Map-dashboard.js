import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ["places"];
const containerStyle = { width: '100%', height: '250px' };
const options = {
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

function MapDashboard({ lat, lng }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries
    });

    const center = { lat: parseFloat(lat), lng: parseFloat(lng) };
    const centerLA = { lat: 34.052235, lng: -118.243683 };

    if (!isLoaded) return <div>Loading</div>;

    return (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={isNaN(center.lat) || isNaN(center.lng) ? centerLA : center}
                zoom={isNaN(center.lat) || isNaN(center.lng) ? 11 : 15}
                options={options}
            >
            <Marker position={isNaN(center.lat) || isNaN(center.lng) ? centerLA : center} />
            </GoogleMap>
        </>
    );
}

export default MapDashboard;
