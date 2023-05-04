import React, { useEffect, useState, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";


export const AuthContext = React.createContext(null);

export function useAuth() {
    return useContext(AuthContext)
  }

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const authListener = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        }
    );

    return () => {
      authListener();
    };
  }, []);

    const logOut = () => {
        signOut(auth).then(() => {
            console.log("Signed out successfully");
        }).catch((error) => console.log(error));
    };

    const value = {
        authUser,
        logOut
    }
    return (
        <AuthContext.Provider value={ value }>
            {children}
        </AuthContext.Provider>
  );
};

export default AuthContextProvider;
