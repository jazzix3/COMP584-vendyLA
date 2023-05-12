import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '75vw',
  height: '60vh' 
};

const centerLA = {
  lat: 34.052235,
  lng: -118.243683,
};

const zoomLA = 10.5;

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

function Map({ locationCenter, businessList, onBusinessSelect }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [mapCenter, setMapCenter] = useState(centerLA);
  const [mapZoom, setMapZoom] = useState(zoomLA);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    if (locationCenter && locationCenter.lat && locationCenter.lng) {
      setMapCenter(locationCenter);
      setMapZoom(13);
    }
  }, [locationCenter]);

  const handleMarkerClick = (business) => {
    setSelectedBusiness(business);
  
    // Check if the business has a valid latitude and longitude
    if (business.location && business.location.latitude && business.location.longitude) {
      setSelectedPosition({ lat: business.location.latitude, lng: business.location.longitude });
    } else if (business.coordinates && business.coordinates.latitude && business.coordinates.longitude) {
      setSelectedPosition({ lat: business.coordinates.latitude, lng: business.coordinates.longitude });
    } else {
      // Set the selected position to the center of the map if no valid coordinates are found
      setSelectedPosition(mapCenter);
    }

  };

  const handleMoreInfoClick = (event) => {
    event.preventDefault(); // Prevents the link from navigating to a new page
    if (selectedBusiness) {
      onBusinessSelect(selectedBusiness);
    };
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={mapZoom}
      options={options}
    >
      {/*Marks position of the location that user input*/}
      <Marker position={mapCenter} icon={{url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'}}
          />

{businessList.map((business, index) => {
  let latitude, longitude;
  if (business.location && business.location.latitude && business.location.longitude) {
    latitude = business.location.latitude;
    longitude = business.location.longitude;
  } else if (business.coordinates && business.coordinates.latitude && business.coordinates.longitude) {
    latitude = business.coordinates.latitude;
    longitude = business.coordinates.longitude;
  }
  if (latitude && longitude) {
    return (
      <Marker
        key={business.id}
        position={{ lat: latitude, lng: longitude}}
        label = {(index + 1).toString()}
        onClick={() => handleMarkerClick(business)}
      />
    );
  }
  return null;
})}


      {selectedBusiness && selectedPosition && (
        <InfoWindow
          position={{ lat: selectedPosition.lat, lng: selectedPosition.lng }}
          onCloseClick={() => {
            setSelectedBusiness(null);
            setSelectedPosition(null);
          }}
        >
          <div>{selectedBusiness.name}
          <p>{selectedBusiness.location.address ||
                `${selectedBusiness.location.address1 ? selectedBusiness.location.address1 + '\n' : ''} 
                ${selectedBusiness.location.address2 ? selectedBusiness.location.address2 + '\n' : ''}
                ${selectedBusiness.location.address3 ? selectedBusiness.location.address3 + '\n' : ''}
                ${selectedBusiness.location.city ? selectedBusiness.location.city + ', ' : ''}
                ${selectedBusiness.location.state ? selectedBusiness.location.state + ' ' : ''}
                ${selectedBusiness.location.zipcode || ''}`}</p>

<a href="#" onClick={handleMoreInfoClick}>View more info</a>     
          </div>
        </InfoWindow>
      )}
          </GoogleMap>
        ) : (
          <></>
        );
      }

export default Map;
