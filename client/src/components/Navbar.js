import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from './Authentication';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import VendyLALogo from "../assets/img/VendyLALogo.png";

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
    }, [authUser]);

    return (
        <Navbar expand="sm" className="navbar-custom" style={{ position: "sticky" }}>

            <Container>
                <Link to="/">
                    <img
                        src={VendyLALogo}
                        alt="Vendy LA Logo"
                        style={{ width: "80px" }}
                    />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-5 pt-2">
                        <Nav.Link
                            as={Link}
                            to="/about"
                            style={{
                                color: 'white',
                                fontSize: '20px'
                            }}
                            onMouseOver={e => e.target.style.color = '#ffbd59'}
                            onMouseOut={e => e.target.style.color = 'white'}
                        >
                            About
                        </Nav.Link>

                        {/* <Nav.Link as={Link} to="/reviews">Reviews</Nav.Link> */}
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
                    ) : (
                        <Nav className="ms-auto" style={{ display: "flex", alignItems: "center" }}>
                            <Link to="/Login">
                                <button className="btn btn-primary">Log In</button>
                            </Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNav;
