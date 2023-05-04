import React from "react";
import TopNav from "../components/Navbar";
import Map from "../components/Map";


const Home = () => {

    return (
        <>  
        <TopNav />
        <div className="container " id="main-content">
            <div className="mt-5" id="map-container">
                <Map />
            </div>
        </div>
        </>
    )
}

export default Home;
