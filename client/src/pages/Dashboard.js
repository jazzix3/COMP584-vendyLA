import React, { useState, useEffect } from "react";
import TopNav from "../components/Navbar";
import { Link } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Button } from "react-bootstrap";

import MapDashboard from "../components/Map-dashboard";


const Dashboard = () => {
    const [currentUid, setCurrentUid] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userProfile, setProfile] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [phone, setPhone] = useState("");
    const [businessImage, setBusinessImage] = useState("");


    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, "users", currentUser.uid);
            getDoc(userDocRef)
                .then((doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        setCurrentUid(currentUser.uid);
                        setFirstName(data.firstName);
                        setLastName(data.lastName);
                        setEmail(data.email);
                        setProfile(data.userProfile);
                        setBusinessName(data.business.name)
                        setAddress(data.business.location.address)
                        setLatitude(data.business.location.latitude)
                        setLongitude(data.business.location.longitude)
                        setPhone(data.business.phone)
                        setBusinessImage(data.business.businessImage)
                    } else {
                        console.log("User not found");
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    console.log(currentUid);
    console.log(latitude);
    console.log(longitude);

    return (
        <>
        <div className="home-cover">
            <TopNav />
            <div className="container mb-3 pt-3 dash-container" id="main-content" style={{ overflow: 'hidden', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.9)' }}>
                <div className="image-placeholder" style={{ width: '200px', height: '200px' }}><img src={userProfile} style={{ width: "200px", height: "200px" }} alt="User Profile" /> </div>
                <h1>Dashboard</h1>
                <p className="greeting">Welcome back <strong>{firstName}</strong>! This is where vendors can view their info.</p>
               
               
                <div className="row dash-row">
                {/* wave section */}
                <div className ="wave-box">
                        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                        </g>
                        </svg>
                    </div>

                    {/* info column*/}
                    <div className="col-12 col-lg-5 col-md-6 col-sm-12 mt-5 info-col" id="user-profile">
                        <h1 className="dash-heading">Profile</h1>
                        <p className="info-labels"><strong>First Name: </strong>{firstName}</p>
                        <p className="info-labels"><strong>Last Name: </strong>{lastName}</p>
                        <p className="info-labels"><strong>Email: </strong>{email}</p>
                        <p className="info-labels"><strong>Profile Image: </strong><img src={userProfile} style={{ width: "40px", height: "40px" }} alt="User Profile" /> </p>
                        <Link to={`/EditProfile/${currentUid}`}>
                            <Button variant="btn edit-btn fw-bold outline-primary" type="submit">Edit Profile</Button>
                        </Link>
                    </div>

                    {/* review column - tbd*/}
                {/*    
                    <div class="col-12 col-lg-6 col-md-12 col-sm-12 mt-5 order-3 order-lg-2 order-md-3 order-sm-3 review-col" id="user-profile">
                        <h1 class="dash-heading">Reviews for {businessName}</h1>
                        <h5>tbd if we're keeping reviews</h5>
                        <hr></hr>
                        <p><strong>First Name: </strong>*reviewer's first name*</p>
                        <p><strong>Last Name: </strong>*reviewer's last name*</p>
                        <p><strong>Review: </strong></p>
                        <hr></hr>
                    </div>
                */}
                    {/* map column*/}
                    <div className="col-12 col-lg-7 col-md-6 col-sm-12 mt-5 map-col" id="business-info" >
                        <h1 className="dash-heading">Business Info</h1>
                        <p className="info-labels"><strong>Business Name: </strong>{businessName}</p>
                        <p className="info-labels"><strong>Location: </strong>{address}</p>
                        <p className="info-labels"><strong>Phone: </strong>{phone}</p>
                        <div className="map-container">
                            <MapDashboard lat={latitude} lng={longitude} />


                            <p className = "mt-3">
                                <p className="mb-3 info-labels"><strong>Business Image: </strong></p>
                                {businessImage && <img src={businessImage} alt="Business" style={{ width: "300px", height: "200px", borderRadius: "8px"}} />}
                            </p>


                            <Link to={`/EditBusiness/${currentUid}`}>
                                <Button variant="btn edit-btn fw-bold outline-primary mb-3" type="submit">Edit Business Information</Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default Dashboard;
