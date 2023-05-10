import React, { useState } from "react";
import TopNav from "../components/Navbar";
import Map from "../components/Map";
import DisplaySearchResults from "../components/search/DisplaySearchResults";
import Searchbar from "../components/search/Searchbar";
import { SearchApi } from "../components/search/SearchApi";

const Home = () => {
    const [businessList, setBusinessList] = useState([]);
    const [locationCenter, setLocationCenter] = useState({ lat: null, lng: null });



    const handleSearchSubmit = async (location) => {
        try {
        // city or zipcode user input from seachbar is passed to SearchApi 
        const { businesses: BusinessResultsArray, latLngResponse } = await SearchApi(location);
        
        

        // Array returned from SearchApi is passed to DisplaySearchResults component
        console.log("home- businesses: " + JSON.stringify(BusinessResultsArray));  // for testing
        setBusinessList(BusinessResultsArray);
        
        console.log ("home- latLngResponse: " + JSON.stringify(latLngResponse));
        setLocationCenter({ lat: latLngResponse.lat, lng: latLngResponse.lng });


        } catch (err) {
        console.error(err);
        }
    };

  return (
    <>
        <TopNav />

        <div className="container rounded p-2 main-content align-top mb-3" id="main-content">
            
            <div className="d-flex justify-content-center">
                <Searchbar onSearch={handleSearchSubmit} />
            </div>
            <div className="row">
            <section
                className="col-12 col-lg-4 col-md-5 col-sm-12 p-3 mt-2 mb-3"
                id="search-results"
                style={{ height: "600px", overflow: "scroll" }}
            >
                <DisplaySearchResults businessList={businessList} />
            </section>
            <div
                className=" col-12 col-lg-8 col-md-7 col-sm-12 mt-2 mb-3 p-3"
                id="map-container"
            >
                <Map locationCenter={locationCenter} businessList={businessList} />
            </div>
            </div>
        </div>
</>
  );
};

export default Home;
