import React, { useState } from "react";
import TopNav from "../components/Navbar";
import Map from "../components/Map";
import DisplaySearchResults from "../components/search/DisplaySearchResults";
import Searchbar from "../components/search/Searchbar";
import { SearchApi } from "../components/search/SearchApi";

const Home = () => {
    const [businessList, setBusinessList] = useState([]);
    const [latLng, setLatLng] = useState({ lat: null, lng: null });

    const handleSearchSubmit = async (location) => {
        try {
        // city or zipcode user input from seachbar is passed to SearchApi 
        const { businesses: BusinessResultsArray } = await SearchApi(location, setLatLng);
        console.log("home: " + JSON.stringify(BusinessResultsArray)) // for testing

        // Array returned from SearchApi is passed to DisplaySearchResults component
        setBusinessList(BusinessResultsArray);
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
                <Map latLng={latLng} />
            </div>
            </div>
        </div>
</>
  );
};

export default Home;
