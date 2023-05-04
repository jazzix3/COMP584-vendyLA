import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import TopNav from "../components/Navbar";
import { auth } from "../firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import { useLocation, useNavigate, Link } from "react-router-dom";
import GoogleSignIn from "./GoogleSignUp";


const Login = () => {

    const [inputEmail, setEmail] = useState("");
    const [inputPassword, setPassword] = useState("");
    const [error, setError] = useState("");

    const location = useLocation();
    const message = new URLSearchParams(location.search).get("message");


    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, inputEmail, inputPassword)
            .then((userCredential) => {
                navigate("/Dashboard")
            })
            .catch((error) => {
                console.log(error)
                setError("Invalid email and/or password");
            });
    }

    return (
        <>
            <TopNav />

            <div className="container" id="main-content">
                {message && <div className="alert alert-success">{message}</div>}
                {error && <Alert variant="danger">{error}</Alert>}
                <h1>Log In</h1>
                <p> New User?<span> <Link to="/Signup">Sign up for an account</Link></span></p>

                <Form onSubmit={login}>
                    <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={inputEmail} onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={inputPassword} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                    
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>

                <div>
                    <GoogleSignIn />
                </div>
            </div>


        </>
    )
}

export default Login;
