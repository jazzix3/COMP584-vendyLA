import React, { useState } from 'react';
import axios from 'axios';

const YelpSearch = () => {
  const [businesses, setBusinesses] = useState([]);
  const [location, setLocation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    <div>
      <h1>Yelp Search Results</h1>
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        {businesses.map((business) => (
          <li key={business.id}>
            <p>{business.name}</p>
            <p>{business.location.address1}</p>
            <img src={business.image_url} alt={business.name} style={{maxWidth: '200px'}} />

            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YelpSearch;
