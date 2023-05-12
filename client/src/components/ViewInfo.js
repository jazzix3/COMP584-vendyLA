import React from 'react'

const ViewInfo = ({ selectedBusiness }) => {
  return (
    <div>
      {selectedBusiness == null && (
        <div style={{ height: '500px', width: '500px', backgroundColor: '#f1b04c' }}>
          <div>
            Placeholder. Need some placeholder photo or text. Maybe welcome message or directions?
          </div>
        </div>
      )}

      {selectedBusiness && (
        <div>
          <h2>{selectedBusiness.name}</h2>
          {/* Display additional information about the business */}
          <img
            src={
              selectedBusiness.businessImage ||
              selectedBusiness.image_url ||
              'https://firebasestorage.googleapis.com/v0/b/vendyla-384123.appspot.com/o/Default%20Business%20Image%2FDefaultBusiness.png?alt=media&token=30f1d0ec-6431-4a04-ba0a-b6bb57a6326c'
            }
            alt={selectedBusiness.name}
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '200px',
            }}
          />
          <p>
            Location:{' '}
            {selectedBusiness.location.address ||
              `${selectedBusiness.location.address1 ? selectedBusiness.location.address1 + '\n' : ''}
              ${selectedBusiness.location.address2 ? selectedBusiness.location.address2 + '\n' : ''}
              ${selectedBusiness.location.address3 ? selectedBusiness.location.address3 + '\n' : ''}
              ${selectedBusiness.location.city ? selectedBusiness.location.city + ', ' : ''}
              ${selectedBusiness.location.state ? selectedBusiness.location.state + ' ' : ''}
              ${selectedBusiness.location.zipcode || ''}`}
          </p>

          {selectedBusiness.phone && <p>Phone: {selectedBusiness.phone}</p>}
          <p></p>
          {selectedBusiness.url && (
            <p>
              <a href={selectedBusiness.url} target="_blank">
                View on Yelp
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default ViewInfo
