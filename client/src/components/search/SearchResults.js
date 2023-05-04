import React from 'react'

const SearchResults = ({ businesses }) => {
    return (

          <ul>
          {Array.isArray(businesses) && businesses.map((business) => (
  <li key={business.id}>
    <p>{business.name}</p>
    <p>{business.location.address1}</p>
    <img src={business.image_url} alt={business.name} style={{maxWidth: '200px'}} />
  </li>
))}

          </ul>
    )
};


export default SearchResults;