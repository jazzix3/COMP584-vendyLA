import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const DisplaySearchResults = ({ businessList, onBusinessSelect }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
      {Array.isArray(businessList) &&
        businessList.map((business, index) => (
          <div key={index}>
            <Card
              style={{
                width: '18rem',
                height: '24rem',
                marginBottom: '1rem',
                transition: 'transform 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{
                width: "100%",
                backgroundColor: "#f1b04c",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Card.Img
                  src={business.businessImage || business.image_url || "https://firebasestorage.googleapis.com/v0/b/vendyla-384123.appspot.com/o/Default%20Business%20Image%2FDefaultBusiness.png?alt=media&token=30f1d0ec-6431-4a04-ba0a-b6bb57a6326c"}
                  alt={business.name}
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain"
                  }}
                />
                <div class="card-number">{index + 1}</div>
              </div>

              <Card.Body>
                <Card.Title>{` ${business.name}`}</Card.Title>
                <Card.Text>
                  {/* if value in businessList is null or undefined, values will not display */}
                  <p>{business.location.address ||
                    `${business.location.address1 ? business.location.address1 + '\n' : ''} 
                      ${business.location.address2 ? business.location.address2 + '\n' : ''}
                      ${business.location.address3 ? business.location.address3 + '\n' : ''}
                      ${business.location.city ? business.location.city + ', ' : ''}
                      ${business.location.state ? business.location.state + ' ' : ''}
                      ${business.location.zipcode || ''}`}</p>
                </Card.Text>
                <Button variant="primary" onClick={() => {
                  onBusinessSelect(business);
                  window.scrollTo({ top: 0 });
                }}>
                  View more info
                </Button>

              </Card.Body>
            </Card>
          </div>
        ))}
    </div>
  );
};


export default DisplaySearchResults;
