import React from 'react'

const DisplaySearchResults = ({ businessList }) => {

  return (
    <ul>
      {Array.isArray(businessList) &&
        businessList.map((business) => (
          <>
            <ul key={business.name}>
              <p><li><strong>{business.name}</strong></li></p>
              {/* if value in businessList is null or undefined, values will not display */}
              <p>{business.location.address ||
                `${business.location.address1 ? business.location.address1 + '\n' : ''} 
                ${business.location.address2 ? business.location.address2 + '\n' : ''}
                ${business.location.address3 ? business.location.address3 + '\n' : ''}
                ${business.location.city ? business.location.city + ', ' : ''}
                ${business.location.state ? business.location.state + ' ' : ''}
                ${business.location.zipcode || ''}`}</p>

              <p>
                <img
                  src={business.businessImage || business.image_url || "https://firebasestorage.googleapis.com/v0/b/vendyla-384123.appspot.com/o/Default%20Business%20Image%2FDefaultBusiness.png?alt=media&token=30f1d0ec-6431-4a04-ba0a-b6bb57a6326c"}
                  alt={business.name}
                  style={{ maxWidth: '300px', maxHeight: '200px' }}
                />

              </p>

            </ul>
          </>
        ))}
    </ul>
  );
};


export default DisplaySearchResults;