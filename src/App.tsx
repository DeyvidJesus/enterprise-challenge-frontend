import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
// import Register from './pages/Register';
import { Dashboard } from "./components/Dashboard";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { Learn } from "./pages/Learn";
import { ToastContainer } from "react-toastify";
import { Volunteer } from "./pages/Volunteer";

import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import TermsAndConditions from "./pages/Terms";
import Profile from "./pages/Profile";
import CookieConsent from "./components/CookiesConsent";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="flex justify-center">
        <CookieConsent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quem-somos" element={<AboutUs />} />
          <Route path="/aprenda" element={<Learn />} />
          <Route path="/seja-voluntario" element={<Volunteer />} />
          <Route path="/contato" element={<ContactUs />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/termos-e-condicoes" element={<TermsAndConditions />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Routes>
      </main>
      <ToastContainer />
    </Router>
  );
};

export default App;
