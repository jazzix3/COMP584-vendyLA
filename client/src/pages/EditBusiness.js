import React, { useState, useEffect } from "react";
import TopNav from '../components/Navbar';
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import PlacesAutoComplete from "../components/PlacesAutoComplete";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditBusiness = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [inputBusinessName, setBusinessName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [inputPhone, setPhone] = useState("");
  const [phoneIsValid, setPhoneIsValid] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Get the user's existing business info from Firestore
    const getBusinessInfo = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setBusinessName(data.business.name);
          setPhone(data.business.phone);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBusinessInfo();
  }, [userId]);

  const uploadImage = async () => {
    try {
      const storageRef = ref(storage, `Business Image/${userId}`);
      await uploadBytes(storageRef, selectedImage);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.log(error);
      setError("Unable to upload image.");
      return null;
    }
  };


  const saveBusinessInfo = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setLoading(true);


    if (phoneIsValid) {
      let imageUrl = null;
      if (selectedImage) {
        imageUrl = await uploadImage();
      } else {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);
        const data = userDocSnap.data();
        imageUrl = data.business.businessImage;
      }

      const userDocRef = doc(db, "users", userId);
      updateDoc(userDocRef, {
        "business.name": inputBusinessName,
        "business.phone": inputPhone,
        "business.location": selectedLocation,
        "business.businessImage": imageUrl,
      })
        .then(() => {
          navigate("/Dashboard");
        })
        .catch((error) => {
          console.log(error);
          setError("Unable to save changes.");
        })
        .finally(() => {
          setLoading(false);
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
      <div className="home-cover">
        <TopNav />
        <div className="container col-6 p-4 mb-5 mt-5 rounded edit-business-container" id="main-content">
          {error && <Alert variant="danger">{error}</Alert>}
          <h1 class="edit-headings">Edit Business Information</h1>

          <Form onSubmit={saveBusinessInfo}>
            <Form.Group className="mb-3 fw-bold" controlId="BusinessName">
              <Form.Label>Business Name</Form.Label>
              <Form.Control type="text" value={inputBusinessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 location fw-bold" controlId="Location">
              <Form.Label>Location</Form.Label>
              <PlacesAutoComplete setLocation={setSelectedLocation} />
            </Form.Group>

            <Form.Group className="mb-3 fw-bold" controlId="Phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" value={inputPhone}
                onChange={checkPhone} required />
              {!phoneIsValid && formSubmitted && (
                <Form.Text className="text-danger">
                  Please enter a valid phone number in the format XXX-XXX-XXXX.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3 fw-bold" controlId="BusinessImage">
              <Form.Label>Business Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />
            </Form.Group>

            <Button variant="btn edit-btn fw-bold outline-light mb-3" type="submit">
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Saving...
              </>
            ) : (
              "Save Information"
            )}
          </Button>
            <Button variant=" btn edit-btn fw-bold outline-light mb-3" onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>Cancel</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditBusiness;