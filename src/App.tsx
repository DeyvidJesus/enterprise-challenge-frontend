import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
// import Register from './pages/Register';
import { Dashboard } from './components/Dashboard';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { Learn } from './pages/Learn';
import { ToastContainer } from 'react-toastify';
import { Volunteer } from './pages/Volunteer';

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
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <ToastContainer />
    </Router>
  );
}

export default App;
