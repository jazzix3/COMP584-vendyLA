import React, { useState, useEffect } from "react";
import TopNav from '../components/Navbar';
import { Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PlacesAutoComplete from "../components/PlacesAutoComplete";

const EditBusiness = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [error, setError] = useState("");

    const [inputBusinessName, setBusinessName] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [inputPhone, setPhone] = useState("");
    const [phoneIsValid, setPhoneIsValid] = useState(true);

    useEffect(() => {
        // Get the user's existing business info from Firestore
        const getBusinessInfo = async () => {
        try {
            const userDocRef = doc(db, "users", userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const data = userDocSnap.data();
                setBusinessName(data.business.businessName);
                setPhone(data.business.phone);
            }
        } catch (error) {
            console.log(error);
        }};
    getBusinessInfo();}, [userId]);
  
    

    const saveBusinessInfo = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (phoneIsValid) {
            const userDocRef = doc(db, "users", userId);
            updateDoc(userDocRef, {
                "business.businessName": inputBusinessName,
                "business.phone": inputPhone,
                "business.location": selectedLocation
            }).then(() => {
                navigate("/Dashboard");
            }).catch((error) => {
                console.log(error);
            });
        } else {
            setError("Invalid input. Unable to save changes.");
        }
    };

    const checkPhone = (e) => {
        const PHONE_REGEX = /^\d{3}-\d{3}-\d{4}$/; // regular expression for XXX-XXX-XXXX
        const value = e.target.value;
        setPhone(value);
        setPhoneIsValid(value === "" || PHONE_REGEX.test(value));
    };

    return (
        <>
        <TopNav />
        <div className="container" id="main-content">
            {error && <Alert variant="danger">{error}</Alert>}
            <h1>Edit Business Information</h1>

            <Form onSubmit={saveBusinessInfo}>
            <Form.Group className="mb-3" controlId="BusinessName">
                <Form.Label>Business Name</Form.Label>
                <Form.Control type="text" value={inputBusinessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3 location" controlId="Location">
                <Form.Label>Location</Form.Label>
                <PlacesAutoComplete setLocation={setSelectedLocation} />
            </Form.Group>

                    <Form.Group className="mb-3" controlId="Phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" value={inputPhone} 
                            onChange={checkPhone} required />
                            {!phoneIsValid && formSubmitted && (
                                <Form.Text className="text-danger">
                                    Please enter a valid phone number in the format XXX-XXX-XXXX.
                                </Form.Text>
                            )}
                    </Form.Group>
            
                    <Button variant="outline-primary" type="submit">Save Business Information</Button>
                    <Button variant="outline-secondary" onClick={() => navigate(-1)} style={{marginLeft:"10px"}}>Cancel</Button>
                </Form>
            </div>
            </>
        );
};

export default EditBusiness;