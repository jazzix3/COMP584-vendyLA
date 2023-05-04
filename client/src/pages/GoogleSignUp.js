import React from "react";
import {Button} from "react-bootstrap";
import { db } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate} from "react-router-dom";

const GoogleSignIn = () => {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const userProfile = user.photoURL;
                const firstName = user.displayName.split(" ")[0];
                const lastName = user.displayName.split(" ")[1];
                const email = user.email;
                return setDoc(doc(db, "users", user.uid), {
                    userProfile: userProfile,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                });
            })
            .then(() => {
                navigate("/Dashboard");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            {/* button that handles the sign in  */}
            <div className="mt-4">
                <Button variant="outline-secondary" onClick={handleGoogleSignIn}>
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" className="me-2" alt="Google Logo" />
                    Sign Up with your Google account
                </Button>
            </div>
        </>
    );
};

export default GoogleSignIn;
