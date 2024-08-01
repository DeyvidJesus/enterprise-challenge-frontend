import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import "./styles/global.css"
import { Dashboard } from './components/Dashboard';
import { Home } from './components/Home';
import { Header } from './components/Header';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { Learn } from './components/Learn';
import { ToastContainer } from 'react-toastify';
import { Volunteer } from './components/Volunteer';
import VLibras from '@djpfs/react-vlibras';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <VLibras />
      <main className='flex justify-center'>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/quem-somos" Component={AboutUs} />
          <Route path="/aprenda" Component={Learn} />
          <Route path="/seja-voluntario" Component={Volunteer} />
          <Route path="/contato" Component={ContactUs} />
          <Route path="/register" Component={Register} />
          <Route path="/dashboard" Component={Dashboard} />
        </Routes>
      </main>
      <ToastContainer />
    </Router>
  );
}

export default App;
