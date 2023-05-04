import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from './Authentication';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function TopNav() {
    const { authUser, logOut } = useContext(AuthContext);
    const [currentUid, setCurrentUid] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userProfile, setUserProfile] = useState("");

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
                        setUserProfile(data.userProfile);
                    } else {
                        console.log("User not found");
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    return (
        <Navbar bg="light" expand="sm" style={{ display: "flex", alignItems: "center" }}>
            <Container>
                <Navbar.Brand href="/" className="mx-auto">VendyLA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/reviews">Reviews</Nav.Link>
                    </Nav>
                    {authUser ? (

                        <Nav className="ms-auto" style={{ display: "flex", alignItems: "center" }}>
                            <Link to="/Dashboard" style={{ display: "flex", alignItems: "center" }}>
                                Logged in as {firstName} {lastName}
                                <img
                                    src={userProfile}
                                    className="rounded-circle ms-2"
                                    alt="User Profile"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            </Link>

                            <Button className="btn btn-primary" style={{ marginLeft: "15px" }} onClick={logOut}>Log Out</Button>
                        </Nav>


                    )

                        : (
                            <Nav className="ms-auto" style={{ display: "flex", alignItems: "center" }}>
                                <Link to="/Login"><button className="btn btn-primary">Log In</button></Link>
                            </Nav>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNav;