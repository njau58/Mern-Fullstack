import React from "react";

import {useSelector} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./App.css";
import Create from "./components/pages/create";
import Profiles from "./components/pages/profiles";
import Me from "./components/pages/Me";
import Footer from "./components/common/footer/Footer";

import HomePage from "./components/pages/HomePage";
import ProfileDetails from "./components/pages/ProfileDetails";
import EditProfileDetails from "./components/pages/EditProfileDetails";
import SignUp from "./components/pages/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/pages/Login";
import NotFound from "./components/pages/404";
import Navbar from "./components/pages/Navbar";
import About from "./components/pages/About";
import './App.css'




toast.configure()

function App() {

  const token = useSelector(state=>state.user.token)

  
 


  return (
    <>
  
    <Router>
    <Dashboard/>
    {token&&<Navbar/>}

      <Routes>
        <Route exact path="/" element={token?<HomePage />:<Login/>} />
        <Route exact path="/create-profile" element={<Create />} />
        <Route
          exact
          path="/view-single-profile/:_id"
          element={<ProfileDetails />}
        />
        <Route
          exact
          path="/edit-company-profile/:_id"
          element={<EditProfileDetails />}
        />
        <Route exact path="/view-profiles" element={<Profiles />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/my-account" element={<Me />} />
        <Route path="*"  element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
