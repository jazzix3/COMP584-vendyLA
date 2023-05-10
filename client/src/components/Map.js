import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';


const containerStyle = {
    width: '75vw',
    height: '60vh' 
};

const centerLA = {
    lat: 34.052235,
    lng: -118.243683,
  };

const zoomLA = 12;

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

function Map({ locationCenter, businessList }) {
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });
  
    const [mapCenter, setMapCenter] = useState(centerLA);
    const [mapZoom, setMapZoom] = useState(zoomLA);
  
    useEffect(() => {
        if (locationCenter && locationCenter.lat && locationCenter.lng) {
          setMapCenter(locationCenter);
          setMapZoom(14);
        }
      }, [locationCenter]);


  
    return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={mapZoom}
        options={options}
      >
        <Marker position={mapCenter} icon={{
          url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          
          }} />

        {businessList.map(business => {
          let latitude, longitude;
          if (business.location && business.location.latitude && business.location.longitude) {
            latitude = business.location.latitude;
            longitude = business.location.longitude;
          } else if (business.coordinates && business.coordinates.latitude && business.coordinates.longitude) {
            latitude = business.coordinates.latitude;
            longitude = business.coordinates.longitude;
          }
          if (latitude && longitude) {
            return <Marker key={business.id} position={{ lat: latitude, lng: longitude }} />;
          }
          return null;
        })}


      </GoogleMap>
    ) : (
      <></>
    );
  }
  

  export default Map
