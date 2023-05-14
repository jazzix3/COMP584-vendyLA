import React, { useState, useEffect } from "react";
import TopNav from '../components/Navbar';
import { Form, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const EditProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [inputFirstName, setFirstName] = useState("");
    const [inputLastName, setLastName] = useState("");
    const [inputUserProfile, setInputUserProfile] = useState(null);
    const [userProfile, setUserProfile] = useState("");
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        // Get the user's existing info from Firestore
        const getUserInfo = async () => {
            try {
                const userDocRef = doc(db, "users", userId);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const data = userDocSnap.data();
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setUserProfile(data.userProfile);

                }
            } catch (error) {
                console.log(error);
            }
        };
        getUserInfo();
    }, [userId]);



    const handleUserProfileChange = (e) => {
        setInputUserProfile(e.target.files[0]);
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userDocRef = doc(db, "users", userId);

        try {
            if (inputUserProfile) {
                const userProfileRef = ref(storage, `Profile Images/${userId}`);
                await uploadBytes(userProfileRef, inputUserProfile);
                const newUserProfile = await getDownloadURL(userProfileRef);
                await updateDoc(userDocRef, {
                    firstName: inputFirstName,
                    lastName: inputLastName,
                    userProfile: newUserProfile,
                });
            } else {
                await updateDoc(userDocRef, {
                    firstName: inputFirstName,
                    lastName: inputLastName,
                });
            }

            navigate("/Dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="home-cover">
                <TopNav />
                <div className="container col-6 p-4 mb-5 mt-5 rounded edit-profile-container" id="main-content">
                    <h1 class="edit-headings">Edit Profile</h1>

                    <Form onSubmit={saveProfile}>
                        <Form.Group className="mb-3 fw-bold" controlId="FirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={inputFirstName}
                                onChange={(e) => setFirstName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3 fw-bold" controlId="LastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={inputLastName}
                                onChange={(e) => setLastName(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3 fw-bold" controlId="userProfile">
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control type="file" onChange={handleUserProfileChange} accept="image/*" />
                        </Form.Group>

                        <Button variant="btn edit-btn fw-bold outline-light" type="submit">            {loading ? (
                            <>
                                <Spinner animation="border" size="sm" /> Saving...
                            </>
                        ) : (
                            "Save Profile"
                        )}</Button>
                        <Button variant="btn edit-btn fw-bold outline-light" onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>Cancel</Button>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default EditProfile;