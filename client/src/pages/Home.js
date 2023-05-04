import React, { useState } from "react";
import TopNav from "../components/Navbar";
import Map from "../components/Map";
import SearchResults from "../components/search/SearchResults";
import Searchbar from "../components/search/Searchbar";
import axios from "axios";


const Home = () => {
    const [businesses, setBusinesses] = useState([]);

    const handleSearch = async (location) => {
    try {
      const response = await axios.get('/api/yelp', {
        params: {
          location: location,
          categories: 'streetvendors',
        },
      });
      console.log(response.data);
      setBusinesses(response.data.businesses);
    } catch (err) {
      console.error(err);
    }
  };

    return (
        <>  
        <TopNav />
        
        <div className="container rounded p-2 main-content align-top mb-3" id="main-content">
          <Searchbar onSearch={handleSearch} />
            <div className = "row">
            <section className="col-12 col-lg-4 col-md-5 col-sm-12 p-3 mt-3 mb-3" id="search-results" style={{ height: '600px', overflow: 'scroll' }}>
  <SearchResults businesses={businesses} />
</section>
                <div className=" col-12 col-lg-8 col-md-7 col-sm-12 mt-3 mb-3 p-3" id="map-container">
                    <Map />
                </div>    
            </div>
        </div>

        </>
    )
}

export default Home;
