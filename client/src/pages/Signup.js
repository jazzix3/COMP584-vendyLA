import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import TopNav from "../components/Navbar";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import GoogleSignIn from "./GoogleSignUp";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const Signup = () => {
    const [inputFirstName, setFirstName] = useState("");
    const [inputLastName, setLastName] = useState("");
    const [inputEmail, setEmail] = useState("");
    const [inputPassword, setPassword] = useState("");
    const [error, setError] = useState("");
    const defaultUserProfile = "https://firebasestorage.googleapis.com/v0/b/myvendylaproject.appspot.com/o/Default%20Profile%20Image%2FDefault%20Pic.jpg?alt=media&token=9d04c4eb-2ba0-4f28-9e6b-f6db89acc939"
    const [inputUserProfile, setInputUserProfile] = useState(defaultUserProfile);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleUserProfileChange = (e) => {
        setInputUserProfile(e.target.files[0]);
    };

    const signup = (e) => {
        e.preventDefault();
        setLoading(true);
        createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                const userRef = doc(db, "users", user.uid);
    
                let userProfilePromise = Promise.resolve(null);
                if (inputUserProfile && inputUserProfile !== defaultUserProfile) {
                    const userProfileRef = ref(storage, `Profile Images/${user.uid}`);
                    userProfilePromise = uploadBytes(userProfileRef, inputUserProfile)
                        .then(() => {
                            return getDownloadURL(userProfileRef);
                        });
                } else {
                    userProfilePromise = Promise.resolve(defaultUserProfile);
                }
                
                                
                return userProfilePromise.then((userProfile) => {
                    return setDoc(userRef, {
                        firstName: inputFirstName,
                        lastName: inputLastName,
                        email: inputEmail,
                        userProfile: userProfile,
                        business: {
                            name: "",       
                            phone: "",
                            website: "",
                            businessImage: "",
                        }
                    }).then(() => {
                        return true;
                    });
                });
            })
            .then((docCreated) => {
                if (docCreated) {
                    return signOut(auth).then(() => {
                        navigate("/Login?message=New account created successfully!");
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Email is already in use");
            })
            .finally(() => {
                setLoading(false);
            });
    };
    

    return (
        <>
            <TopNav />
            <div class="background-container">
            <div className="container col-6 p-5 mb-5 mt-5 rounded signup-container" id="main-content">
                {error && <Alert variant="danger">{error}</Alert>}
                <h1 className ="mb-3">Sign Up</h1>
                <p style={{ fontSize: '16px', fontWeight: 'bold' }}> Already have an account?<span><Link to="/Login">Log in</Link></span></p>

                <Form onSubmit={signup}>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label style={{ fontSize: '16px', fontWeight: 'bold' }}>First Name</Form.Label>
                        <Form.Control type="text" value={inputFirstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label style={{ fontSize: '16px', fontWeight: 'bold' }}>Last Name</Form.Label>
                        <Form.Control type="text" value={inputLastName} onChange={(e) => setLastName(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label style={{ fontSize: '16px', fontWeight: 'bold' }}>Email address</Form.Label>
                        <Form.Control type="email" value={inputEmail} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label style={{ fontSize: '16px', fontWeight: 'bold' }}>Password</Form.Label>
                        <Form.Control type="password" value={inputPassword} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="userProfile">
                        <Form.Label style={{ fontSize: '16px', fontWeight: 'bold' }}>Profile Image</Form.Label>
                        <Form.Control type="file" onChange={handleUserProfileChange} accept="image/*" />
                    </Form.Group>


                    <Button variant="primary" type="submit" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {loading ? (
                            <>
                            <Spinner animation="border" size="sm" /> Submitting...
                            </>
                        ) : (
                            "Submit"
                        )}</Button>
                </Form>

                <div>
                    <GoogleSignIn />
                </div>
            </div>
            </div>
        </>
    );
};

export default Signup;