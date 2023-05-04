import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reviews from "./pages/Reviews";
import Dashboard from "./pages/Dashboard";
import EditProfile from './pages/EditProfile';
import EditBusiness from './pages/EditBusiness';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Reviews" element={<Reviews />} />
                    <Route path="/Dashboard" 
                        element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/EditProfile/:userId" 
                        element={<PrivateRoute><EditProfile /></PrivateRoute>} />
                    <Route path="/EditBusiness/:userId" 
                        element={<PrivateRoute><EditBusiness /></PrivateRoute>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
