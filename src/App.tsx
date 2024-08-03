import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import { Dashboard } from './components/Dashboard';
import { Home } from './components/Home';
import { Header } from './components/Header';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { Learn } from './components/Learn';
import { ToastContainer } from 'react-toastify';
import { Volunteer } from './components/Volunteer';

import "./styles/global.css";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className='flex justify-center'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quem-somos" element={<AboutUs />} />
          <Route path="/aprenda" element={<Learn />} />
          <Route path="/seja-voluntario" element={<Volunteer />} />
          <Route path="/contato" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <ToastContainer />
    </Router>
  );
}

export default App;
