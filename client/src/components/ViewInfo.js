import React from 'react'

const ViewInfo = ({ selectedBusiness }) => {
  return (
    <div>
      {selectedBusiness == null && (
        <div
          className="container p-5 rounded home-business-background"
        >
          <div className="text-center">
            <h1 className="mb-4 pt-4 pb-5" style={{textDecoration: 'underline'}}>Welcome to VendyLA!</h1>
            <p className="pt-2" style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', fontWeight: 'bold', fontSize: '16px' }}>
              Here you can find the best street vendors within the Los Angeles area!
            </p>
            <p style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', fontWeight: 'bold', fontSize: '16px' }}>
              We welcome all vendors to sign up and add their business information.
            </p>


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
